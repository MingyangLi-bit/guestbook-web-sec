import { getDatabase, closeDBInstance } from "@/lib/db";

const filter = async (db, queryParams) => {
    const nameQuery = queryParams.name;
    if (nameQuery == '') { // No name provided
        return [];
    }

    return new Promise((resolve, reject) => {
        const query = `SELECT message FROM messages WHERE name = \'${nameQuery}\'`;
        console.log(query);
        db.query(query, (err, rows, fields) => {
            if (fields.length > 1 && fields[0].constructor == Array) {
                rows = rows[0]; // I have no idea why it returned an array of arrays but need to extract it out
            }
            if (err) {
                console.error("Error getting messages2");
                return reject(err);
            }
            return resolve(rows.map(r => r.message));
        });
    });
};

export default async function handler(req, res) {
    const db = getDatabase();
    try {
        const messages = await filter(db, req.query);
        closeDBInstance(db);
        console.log("YONNEH");
        res.status(200).json(messages);
    } catch (e) {
        console.log("WERE IN THIS ONE");
        console.error(e);
        closeDBInstance(db);
        res.status(400).json(e.message);
    }
};