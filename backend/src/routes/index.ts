import express from "express";
import controller from "../controller";
const router = express.Router();

router.get("/", controller.request);

/* User requests */
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/getAccount", controller.getAccount);
router.patch("/updateUser", controller.updateUserObjectById);
router.patch("/setStreak", controller.setStreak);
router.patch("/resetStreak", controller.resetStreak);
router.delete("/deleteAccount", controller.deleteAccount);

/* Invite system requests */
router.post("/giveInvite", controller.giveInvite);
router.post("/inviteWave", controller.inviteWave);
router.get("/seeInvites", controller.seeInvites);

/* Directory & Stack requests */
router.get("/getNotes", controller.getNotes);
router.post("/getNote", controller.getNote);
router.post("/getNotesBySlug", controller.getNotesBySlug);
router.post("/newNote", controller.newNote);
router.post("/newNotepad", controller.newNotepad);
router.patch("/updateNote", controller.updateNote);
router.post("/deleteNote", controller.deleteNote);

/* Card requests*/
router.post("/newCard", controller.newCard);
router.post("/generateNewCards", controller.generateNewCards);
router.get("/getCards", controller.getCards);
router.post("/getCard", controller.getCardByIdOrFirst);
router.patch("/updateCard", controller.updateCard);
router.post("/deleteCard", controller.deleteCard);

export default router;