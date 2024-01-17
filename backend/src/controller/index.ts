import { Request, Response, NextFunction } from 'express';
import { createInvite, getInviteByCode, deleteInviteByCode, getInvitesByOwner } from './../db/invite'
import { createUser, getAllUsers, getUserByName, getUserById, updateUserById, deleteUserById } from './../db/user'
import * as argon2 from "argon2";
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import { createSession, deleteSessionByOwner, getSessionByCode, getSessionByOwner } from '../db/session';
import { createNote, deleteNoteById, getNoteById, getNotesByOwner, updateNoteById } from '../db/note';
import { StringObject } from '../types/StringObject';
import StringBuilder from '../utils/StringBuilder';
import { blacklistedTitles } from '../security/blacklist';
import { createCard, deleteCardById, getCardById, getCardsByOwner, unsetNextFieldOnCardById, updateCardById } from '../db/card';
import { Card } from '../db/models/card.model';
import { Session } from '../db/models/session.model';
import { Invite } from '../db/models/invite.model';
import { Note } from '../db/models/note.model';
import { generateCards, generateCardsByText } from '../utils/generateCards';
import retrieveCardsSortedByReference from '../utils/retrieveCardsSortedByReference';

const request = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hello world!",
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, inviteCode } = req.body;

  if (!username || !password || !inviteCode) {
    let errorMessage = "";
  
    switch (true) {
      case !username:
        errorMessage = errorMessage + "Username is missing.";
        break;
      case !password:
        errorMessage = errorMessage + "Password is missing.";
        break;
      case !inviteCode:
        errorMessage = errorMessage + "Invite code is missing.";
        break;
      default:
        errorMessage = "Invalid request.";
        break;
    }
  
    return res.status(406).json({
      message: errorMessage,
    });
  }

  try {
    const uniqueName = await getUserByName(username);
    
    if (uniqueName) {
      return res.status(406).json({
        message: "There already is a user with that username.",
      });
    }

    /* Username requirements
        - Can contain lowercase letters (a-z), digits (0-9) and underscores ("_")
        - Is at least 3 characters long and at most 25 characters long
    */
    const usernamePattern = /^[a-z0-9_]{3,25}$/;
    if (!usernamePattern.test(username)) {
      return res.status(406).json({
        message: "Username does not meet requirements.",
      });
    }

    /* Password requirements
        - Contains at least one lowercase letter (a-z)
        - Contains at least one uppercase letter (A-Z)
        - Contains at least one digit (0-9)
        - Contains at least one special character like (!@#$%^&*()-_=+[]{}|;:'",.<>?/~`)

        - Is at least 8 characters long and at most 60 characters long
    */
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`])[a-zA-Z\d!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`]{8,60}$/;
    if (!passwordPattern.test(password)) {
      return res.status(406).json({
        message: "Password does not meet requirements.",
      });
    }

    const invite = await getInviteByCode(inviteCode);

    if (invite != null || username === process.env.OWNER_USERNAME) {
      const hashedPassword = await argon2.hash(password);
      
      try {
        if (!invite) {
          await createUser(username, hashedPassword);
        } else {
          await createUser(username, hashedPassword, invite.owner);
        }
      } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
          message: "An error occurred during user creation.",
        });
      }

      try {
        if (invite) {
          await deleteInviteByCode(invite.code);
        }
      } catch (error) {
        console.error('Error deleting invite code:', error);
        return res.status(500).json({
          message: "An error occurred during user creation.",
        });
      }

      return res.status(200).json({
        message: "User registered successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Invalid invite code!",
      });
    }
  } catch (error) {
    console.error('Error while registering:', error);
    return res.status(500).json({
      message: "An error occurred during registration.",
    });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    let errorMessage = "";
  
    switch (true) {
      case !username:
        errorMessage = errorMessage + "Username is missing.";
        break;
      case !password:
        errorMessage = errorMessage + "Password is missing.";
        break;
      default:
        errorMessage = "Invalid request.";
        break;
    }
  
    return res.status(406).json({
      message: errorMessage,
    });
  }

  try {
    const user = await getUserByName(username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(404).json({
        message: "Invalid username or password.",
      });
    }

    const existingSession = getSessionByOwner(user._id);
    if (existingSession != null) {
      deleteSessionByOwner(user._id)
    }

    const sessionId = uuidv4();
    const hashedSessionId = await argon2.hash(sessionId);
    await createSession(user._id, hashedSessionId)

    res.cookie('session_id', [user._id, sessionId], {
      httpOnly: true, 
      maxAge: 2419200000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: "Login successful.",
    });
  } catch (error) {
    console.error('Error while logging in:', error);
    return res.status(500).json({
      message: "An error occurred during login.",
    });
  }
};

const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbSession = await getSessionByOwner(req.cookies.session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, req.cookies.session_id[1]);
    const session_id = req.cookies.session_id;

    if (isSessionValid) {
      const user = await getUserById(new ObjectId(session_id[0]));

      if (!user) {
        return res.status(500).json({
          message: "Error retrieving user.",
        });
      }

      return res.status(200).json({
        message: `Successfully retrieved '${user.name}'.`,
        user: { name: user.name, createdAt: user.createdAt, streakLastUpdatedAt: user.streakLastUpdatedAt, view: user.view, streak: user.streak }
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: "An error occurred while deleting your account.",
    });
  }
};

const updateUserObjectById = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, newPassword, view } = req.body;

  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }

    if ((!name || name.trim() === '') && (!password && !newPassword) && (view != 1 && view != 2)) {
      return res.status(406).json({
        message: "Request body is missing content that shall be updated.",
      });
    }

    /* Username requirements
        - Can contain lowercase letters (a-z), digits (0-9) and underscores ("_")
        - Is at least 3 characters long and at most 25 characters long
    */
    const usernamePattern = /^[a-z0-9_]{3,25}$/;
    if (!usernamePattern.test(name)) {
      return res.status(406).json({
        message: "Username does not meet requirements.",
      });
    }

    /* Password requirements
        - Contains at least one lowercase letter (a-z)
        - Contains at least one uppercase letter (A-Z)
        - Contains at least one digit (0-9)
        - Contains at least one special character like (!@#$%^&*()-_=+[]{}|;:'",.<>?/~`)

        - Is at least 8 characters long and at most 60 characters long
    */
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`])[a-zA-Z\d!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`]{8,60}$/;
    if (!passwordPattern.test(password) && password !== undefined) {
      return res.status(406).json({
        message: "Password does not meet requirements.",
      });
    }

    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    
    let updateObject: StringObject = {};

    if (name) updateObject.name = name;
    if (password) updateObject.password = await argon2.hash(password);
    if (view) updateObject.view = view;

    if (isSessionValid) {
      await updateUserById(new ObjectId(session_id[0]), updateObject);
      const user = await getUserById(new ObjectId(session_id[0]));

      if (!user) {
        return res.status(500).json({
          message: "Error retrieving user.",
        });
      }

      return res.status(200).json({
        message: `Successfully retrieved '${user.name}'.`,
        user: { name: user.name, createdAt: user.createdAt, view: user.view }
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: "An error occurred while deleting your account.",
    });
  }
};

const setStreak = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);
    
    if (isSessionValid) {
      const user = await getUserById(session_id[0]);
      
      if (!user) {
        return res.status(500).json({
          message: "Error updating user.",
        });
      }

      let updateObject: { streak: number, streakLastUpdatedAt: Date };
      let streak: number | undefined = user?.streak;
      if (streak && streak !== 0) {
        const now: Date = new Date();
        const newDay: boolean = user?.streakLastUpdatedAt?.toDateString() !== now.toDateString();
        if (newDay) {
          updateObject = {
            streak: ++streak,
            streakLastUpdatedAt: now
          }
        } else {
          return res.status(208).json({
            message: `Streak update already reported for '${now.toDateString()}'.`,
            day: now.toDateString(),
            streak: streak
          });
        }
      } else {
        updateObject = {
          streak: 1,
          streakLastUpdatedAt: new Date()
        }
      }

      const updatedUser = await updateUserById(new ObjectId(session_id[0]), updateObject);
      if (!updatedUser) {
        return res.status(500).json({
          message: "Error updating user.",
        });
      }

      return res.status(200).json({
        message: `Successfully updated the streak of '${user.name}'.`,
        streak: updateObject.streak
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: "An error occurred while deleting your account.",
    });
  }
};

const resetStreak = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);
    
    if (isSessionValid) {
      const user = await getUserById(session_id[0]);
      
      if (!user) {
        return res.status(500).json({
          message: "Error updating user.",
        });
      }

      const now: Date = new Date();
      const updateObject: { streak: number, streakLastUpdatedAt: Date } = {
          streak: 0,
          streakLastUpdatedAt: now
      };

      const updatedUser = await updateUserById(new ObjectId(session_id[0]), updateObject);
      if (!updatedUser) {
        return res.status(500).json({
          message: "Error updating user.",
        });
      }

      return res.status(200).json({
        message: `Successfully updated the streak of '${user.name}'.`,
        streak: updateObject.streak
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: "An error occurred while deleting your account.",
    });
  }
};

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      /* Delete the user */
      const user = await deleteUserById(new ObjectId(session_id[0]));

      if (!user) {
        return res.status(500).json({
          message: "Error deleting user.",
        });
      }

      /* Delete users data */
      let cards: Card[] | null = await getCardsByOwner(new ObjectId(session_id[0]));
      let invites: Invite[] | null = await getInvitesByOwner(new ObjectId(session_id[0]));
      let notes: Note[] | null = await getNotesByOwner(new ObjectId(session_id[0]));
      let session: Session | null = await getSessionByOwner(new ObjectId(session_id[0]));

      if (cards != null) {
        cards.forEach(card => {
          deleteCardById(card._id);
        });
      }

      if (invites != null) {
        invites.forEach(invite => {
          deleteInviteByCode(invite.code);
        });
      }

      if (notes != null) {
        notes.forEach(note => {
          deleteNoteById(note._id);
        });
      }

      if (session != null) {
        deleteSessionByOwner(session.owner);
      }

      return res.status(200).json({
        message: `Successfully deleted '${user[0].name}'.`,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: "An error occurred while deleting your account.",
    });
  }
};

const giveInvite = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }

    if (!username) {
      return res.status(406).json({
        message: "Request body is missing username.",
      });
    }

    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const user = await getUserById(new ObjectId(session_id[0]));

      if (user != null && user.name === process.env.OWNER_USERNAME) {
        createInvite(uuidv4(), user._id);

        return res.status(200).json({
          message: `Successfully gave '${username}' an invite.`,
        });
      } else {
        return res.status(401).json({
          message: "Unauthorized with your role.",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while giving an invite:', error);
    return res.status(500).json({
      message: "An error occurred while giving an invite.",
    });
  }
};

const inviteWave = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const user = await getUserById(new ObjectId(session_id[0]));

      if (user != null && user.name === process.env.OWNER_USERNAME) {
        const users = await getAllUsers();

        users?.forEach((user) => {
          createInvite(uuidv4(), user._id)
        })

        return res.status(200).json({
          message: "Successfully gave everyone an invite.",
        });
      } else {
        return res.status(401).json({
          message: "Unauthorized with your role.",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while giving everyone an invite:', error);
    return res.status(500).json({
      message: "An error occurred during invite wave.",
    });
  }
};

const seeInvites = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const invites = await getInvitesByOwner(session_id[0]);

      if (!invites || invites.length === 0) {
        return res.status(404).json({
          message: "You have no invites.",
        });
      }

      const inviteCodes: string[] = invites.map((invite) => invite.code);

      return res.status(200).json({
        message: `Found ${invites.length} invites.`,
        inviteCodes: inviteCodes,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while getting invites:', error);
    return res.status(500).json({
      message: "An error occurred while getting invites.",
    });
  }
};

const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const notes = await getNotesByOwner(session_id[0]);

      if (!notes || notes.length === 0) {
        return res.status(404).json({
          message: `You have no notes.`,
        });
      };

      return res.status(200).json({
        message: `Found ${notes.length} notes.`,
        notes: notes,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while getting notes:', error);
    return res.status(500).json({
      message: "An error occurred while getting notes.",
    });
  }
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
  const { note_id } = req.body;

  try {

    if (!note_id) {
      return res.status(406).json({
        message: "Request body is missing note ID.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const note = await getNoteById(new ObjectId(note_id));

      if (!note) {
        return res.status(404).json({
          message: `You have no notes.`,
        });
      };

      return res.status(200).json({
        message: `Found note '${note.title}'.`,
        note: note,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while getting note:', error);
    return res.status(500).json({
      message: "An error occurred while getting a note.",
    });
  }
};

const getNotesBySlug = async (req: Request, res: Response, next: NextFunction) => {
  let { directory, note } = req.body;
  
  try {

    if (!directory) {
      return res.status(406).json({
        message: "Request body is missing the directory.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const notes = await getNotesByOwner(session_id[0]);

      if (!notes || notes.length === 0) {
        return res.status(404).json({
          message: `You have no notes.`,
        });
      };

      if (directory && directory.length === 1) {
        if (!directory[0].startsWith("/")) directory = "/" + directory;

        const notesInDirectory = notes.filter((obj) => obj.directory !== undefined && obj.directory === directory || obj.directory.startsWith(directory));
        
        if (!notesInDirectory) {
          return res.status(404).json({
            message: `You have no notes here.`,
          });
        }

        return res.status(200).json({
          message: `Found ${notes.length} notes.`,
          directory: true,
          note: false,
          notes: notesInDirectory,
        });
      }

      const builder = new StringBuilder();
      directory[0].startsWith("/") ? builder.append(directory[0]) : builder.append(`/${directory[0]}`) + directory[1].startsWith("/") ? builder.append(directory[1]) : builder.append(`/${directory[1]}`)
      const dir: string = builder.toString();

      if (note !== undefined || note !== null) {
        if (note && note.length === 1 && note.startsWith("/")) {
          note = note.slice(1);
        }

        const noteInDirectory = notes.filter((obj) => obj.title !== undefined && obj.title !== ' ' && obj.directory === dir);

        if (!noteInDirectory || !(noteInDirectory.length > 0)) {
          return res.status(404).json({
            message: `You have no note here.`,
          });
        }

        return res.status(200).json({
          message: `Found ${noteInDirectory.length} notes.`,
          directory: false,
          note: true,
          notes: noteInDirectory,
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while getting notes:', error);
    return res.status(500).json({
      message: "An error occurred while getting notes.",
    });
  }
};

const newNotepad = async (req: Request, res: Response, next: NextFunction) => {
  let { title } = req.body;

  try {

    if (!title) {
      return res.status(406).json({
        message: "Request body is missing title.",
      });
    } 

    if (!(/^[a-zA-Z0-9\s]+$/.test(title)) || title.length >= 250 || blacklistedTitles.includes(title)) {
      return res.status(406).json({
        message: "Invalid title.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      if (!title.startsWith("/")) {
        title = "/" + title.trim();
      }

      const allNotes = await getNotesByOwner(session_id[0]);

      if (allNotes != null) {
        for (const note of allNotes) {
          if (note.directory === title) {
            return res.status(406).json({
              message: `Notepad title must be unique.`,
            });
          }
        }
      }

      const note = await createNote(session_id[0]," ", " ", title);

      if (!note) {
        return res.status(500).json({
          message: `Error creating note.`,
        });
      };

      return res.status(201).json({
        message: `Created note '${note.title}'.`,
        note: note,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while creating a note:', error);
    return res.status(500).json({
      message: "An error occurred during note creation.",
    });
  }
};

const newNote = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, directory } = req.body;

  try {

    if (!title || !directory) {
      return res.status(406).json({
        message: "Request body is missing something.",
      });
    }

    if (!(/^[a-zA-Z0-9\s]+$/.test(title)) || title.length <= 250 || blacklistedTitles.includes(title)) {
      return res.status(406).json({
        message: "Invalid title.",
      });
    }

    if (!directory.startsWith('/')) {
      return res.status(406).json({
        message: "Invalid directory.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const existingNoteTitle = await getNotesByOwner(session_id[0]);
      
      if (existingNoteTitle != null) {
        for (const note of existingNoteTitle) {
          if (note.title === title) {
            return res.status(406).json({
              message: `There already is a note with that title.`,
            });
          }
        }
      }

      const note = await createNote(session_id[0], title, content ?? '', directory);

      if (!note) {
        return res.status(500).json({
          message: `Error creating note.`,
        });
      };

      return res.status(201).json({
        message: `Created note '${note.title}'.`,
        note: note,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while creating a note:', error);
    return res.status(500).json({
      message: "An error occurred during note creation.",
    });
  }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  const { note_id, notepad, originalTitle, title, content, directory } = req.body;

  try {
    if (!req.cookies.session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }

    if (!note_id && !originalTitle) {
      return res.status(406).json({
        message: "Request body is missing information on the note that shall be updated.",
      });
    }

    if (!title && !content && !directory) {
      return res.status(406).json({
        message: "Request body is missing property that shall be updated.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      let updateObject: StringObject = {};

      if (title) updateObject.title = title;
      if (content) updateObject.content = content;
      if (directory) updateObject.directory = directory;

      const allNotes = await getNotesByOwner(session_id[0]);

      if (notepad) {
        if (allNotes !== null) {
          for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].directory === originalTitle) {
              await updateNoteById(allNotes[i]._id, updateObject);
            };
          }
        }

        return res.status(200).json({
          message: `Updated name of notepad '${originalTitle}' to '${directory}'.`
        });
      }

      let note;
      if (note_id === undefined && originalTitle !== undefined) {
        if (allNotes !== null) {
          for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].title === originalTitle || `/${allNotes[i].title}` === originalTitle) {
              note = await updateNoteById(allNotes[i]._id, updateObject);
            };
          }
        }
      } else {
        note = await updateNoteById(new ObjectId(note_id), updateObject);
      }

      if (!note) {
        return res.status(500).json({
          message: `Error updating note.`,
        });
      };

      return res.status(200).json({
        message: `Updated note '${note.title}'.`,
        note: note,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while updating a note:', error);
    return res.status(500).json({
      message: "An error occurred while updating note.",
    });
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  const { note_id } = req.body;

  try {

    if (!note_id) {
      return res.status(406).json({
        message: "Request body is missing the note ID.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const stack = await getNoteById(new ObjectId(note_id));
      const note = await deleteNoteById(new ObjectId(note_id));

      if (!note || !stack) {
        return res.status(500).json({
          message: `Error deleting note.`,
        });
      };
      
      const allCardsInStack = await retrieveCardsSortedByReference(session_id[0], stack.directory.substring(1));
      
      if (!allCardsInStack) {
        return res.status(500).json({
          message: `Error deleting note.`,
        });
      };

      for (const card of allCardsInStack) {
        await deleteCardById(card._id);
      }

      return res.status(200).json({
        message: `Deleted note '${note.title}' and its cards.`,
        note: note,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while deleting a note:', error);
    return res.status(500).json({
      message: "An error occurred while deleting note.",
    });
  }
};

const newCard = async (req: Request, res: Response, next: NextFunction) => {
  const { question, answer, stack } = req.body;

  try {

    if (!question || !answer || !stack) {
      return res.status(406).json({
        message: "Request body is missing something.",
      });
    }

    if (stack.length > 2) {
      return res.status(406).json({
        message: "Invalid stack.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const card = await createCard(session_id[0], question, answer, stack);

      if (!card) {
        return res.status(500).json({
          message: `Error creating card.`,
        });
      };

      const allCards = await getCardsByOwner(session_id[0]);
      allCards?.forEach(async lastCard => {
        if (lastCard.stack[0] === card!.stack[0] && lastCard.stack[1] === card!.stack[1] && lastCard.next == undefined && !card._id.equals(lastCard._id)) {
          let updateObject: { next: ObjectId };
          updateObject = { next: card._id };
          await updateCardById(lastCard._id, updateObject);
        }
      });

      return res.status(201).json({
        message: `Created card '${card.question}'.`,
        card: card,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while creating a card:', error);
    return res.status(500).json({
      message: "An error occurred during card creation.",
    });
  }
};

const generateNewCards = async (req: Request, res: Response, next: NextFunction) => {
  const { url, text, stack } = req.body;

  try {

    if ((!url && !text) || !stack) {
      return res.status(406).json({
        message: "Request body is missing something.",
      });
    }

    if (stack.length > 2) {
      return res.status(406).json({
        message: "Invalid stack.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      let cards: {question: string; answer: string;}[];
      let atLeastOneWasGenerated: boolean = false;
      
      try {
        if (url) {
          cards = await generateCards(url);
        } else {
          cards = await generateCardsByText(text);
        }

        for (let i = 0; i < cards.length; i++) {
          let card: Card | null = null;
          if (!(cards[i].question === "" || cards[i].answer === "")) {
            atLeastOneWasGenerated = true;
            card = await createCard(session_id[0], cards[i].question, cards[i].answer, stack);
          }
          
          if (card !== null) {
            const allCards = await getCardsByOwner(session_id[0]);
            allCards?.forEach(async lastCard => {
              if (lastCard.stack[0] === card!.stack[0] && lastCard.stack[1] === card!.stack[1] && lastCard.next == undefined && !card?._id.equals(lastCard._id)) {
                let updateObject: { next: ObjectId };
                updateObject = { next: card!._id };
                await updateCardById(lastCard._id, updateObject);
              }
            });
          }
        }
  
        if (!cards || !atLeastOneWasGenerated) {
          return res.status(500).json({
            message: `Error creating cards.`,
          });
        };
  
        return res.status(201).json({
          message: `Created cards.`,
        });
      } catch (error: any) {
        // console.log(error.message);
      }
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while creating a card:', error);
    return res.status(500).json({
      message: "An error occurred during card creation.",
    });
  }
};

const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const cards = await getCardsByOwner(session_id[0]);

      if (!cards || cards.length === 0) {
        return res.status(404).json({
          message: `You have no cards.`,
        });
      };

      return res.status(200).json({
        message: `Found ${cards.length} cards.`,
        cards: cards,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while getting cards:', error);
    return res.status(500).json({
      message: "An error occurred while getting cards.",
    });
  }
};

const getCardByIdOrFirst = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId, nextId, stack } = req.body;
  
  try {
    const session_id: [ObjectId, string] | null = req.cookies.session_id;

    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    } 
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      if (cardId && nextId) {
        const nextCard = await getCardById(nextId);
        const currentCard = await getCardById(cardId);

        if (!nextCard || !currentCard) {
          return res.status(404).json({
            message: `Could not find a card with the provided id.`,
          });
        };

        return res.status(200).json({
          message: `Found the card.`,
          card: nextCard,
        });
      } else if (stack) {
        const allCards = await getCardsByOwner(session_id[0]);

        if (!allCards || allCards.length === 0) {
          return res.status(404).json({
            message: `You have no cards.`,
          });
        };

        const sortedCards = await retrieveCardsSortedByReference(session_id[0], stack);

        if (!sortedCards) {
          return res.status(404).json({
            message: `You do not have any cards in this stack.`,
          });
        }

        return res.status(200).json({
          message: `Found the card.`,
          card: sortedCards[0],
          stackLength: sortedCards.length
        });
      } else {
        return res.status(406).json({
          message: `You need to provide either the id of the next card or your stack.`,
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while getting cards:', error);
    return res.status(500).json({
      message: "An error occurred while getting cards.",
    });
  }
};

const updateCard = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId, question, answer } = req.body;

  try {
    if (!req.cookies.session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }

    if (!cardId) {
      return res.status(406).json({
        message: "Request body is missing information on the card that shall be updated.",
      });
    }

    if (!question && !answer) {
      return res.status(406).json({
        message: "Request body is missing property that shall be updated.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      let updateObject: StringObject = {};

      if (question) updateObject.question = question;
      if (answer) updateObject.answer = answer;

      const card = await updateCardById(cardId, updateObject);

      if (!card) {
        return res.status(500).json({
          message: `Error updating card.`,
        });
      };

      return res.status(200).json({
        message: `Updated card.`,
        card: card,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while updating a card:', error);
    return res.status(500).json({
      message: "An error occurred while updating card.",
    });
  }
};

const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.body;

  try {

    if (!cardId) {
      return res.status(406).json({
        message: "Request body is missing the card ID.",
      });
    }

    const session_id: [ObjectId, string] | null = req.cookies.session_id;


    if (!session_id) {
      return res.status(403).json({
        message: "You are not signed in.",
      });
    }
    
    const dbSession = await getSessionByOwner(session_id[0]);

    if (!dbSession) {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
    
    const isSessionValid = await argon2.verify(dbSession.code, session_id[1]);

    if (isSessionValid) {
      const card = await deleteCardById(cardId);

      if (!card) {
        return res.status(500).json({
          message: `Error deleting card.`,
        });
      };

      const allCards = await getCardsByOwner(session_id[0]);
      allCards?.forEach(async selectedCard => {
        // console.log(selectedCard.next, cardId)
        if (selectedCard.next?.equals(new ObjectId(cardId))) {
          // console.log(true)
          await updateCardById(selectedCard._id, { next: card.next });
        }
      });

      return res.status(200).json({
        message: `Deleted card.`,
        card: card,
      });
    } else {
      return res.status(401).json({
        message: "Invalid session.",
      });
    }
  } catch (error) {
    console.error('Error while deleting a card:', error);
    return res.status(500).json({
      message: "An error occurred while deleting card.",
    });
  }
};


export default {
  request,
  register,
  login,
  getAccount,
  updateUserObjectById,
  setStreak,
  resetStreak,
  deleteAccount,
  giveInvite,
  inviteWave,
  seeInvites,
  getNotes,
  getNote,
  getNotesBySlug,
  newNotepad,
  newNote,
  newCard,
  generateNewCards,
  getCards,
  getCardByIdOrFirst,
  updateCard,
  deleteCard,
  updateNote,
  deleteNote,
};