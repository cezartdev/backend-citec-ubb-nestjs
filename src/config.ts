import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
            url: process.env.DATABASE_URL,
        },
        apiKey: process.env.API_KEY,
        jwt: {
            secret: process.env.JWT_SECRET,
        },
    };
});
