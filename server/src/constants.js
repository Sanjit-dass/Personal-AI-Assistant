const DB_Name = "AI_TUTOR";
const accessTokenAge = 30 * 24 * 60 * 60 * 1000;
const refreshTokenAge = 60 * 24 * 60 * 60 * 1000;

const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: accessTokenOptions,
};
const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: refreshTokenOptions,
};

export {
    DB_Name,
    accessTokenAge,
    refreshTokenAge,
    accessTokenOptions,
    refreshTokenOptions,
};
