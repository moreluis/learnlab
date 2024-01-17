export default function(cookies: string[]): void {
    for (const cookie of cookies) {
        const [name, _] = cookie.trim().split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}