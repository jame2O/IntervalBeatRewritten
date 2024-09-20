const welcomeQuotes: string[] = [
    "Craving a sweat, {user}?",
    "Wow {user}, looking good!",
    "Good {timeOfDay}, {user}.",
    "Going for a PR today, {user}?",
    "Lovely {timeOfDay} to get out there, {user}!",
    "Out and about, are we?",
    "{user}, ready to get stuck in?"
]

export function buildQuote(user: string) {
    let tod = ""
    let quote = welcomeQuotes[Math.floor(Math.random()*welcomeQuotes.length)];
    const currentHour = (new Date()).getUTCHours();
    if (currentHour < 12) {
        tod = "morning"
    } else if (currentHour < 18) {
        tod = "afternoon"
    } else {
        tod = "evening"
    }
    let update1 = quote.replace("{user}", user);
    let update2 = update1.replace("{timeOfDay}", tod);
    return update2;
}

    