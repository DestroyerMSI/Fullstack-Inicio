import Cors from 'cors';  

export const cors = () => Cors({  
    origin: (origin, callback) => {  
        const allowedOrigins = [  
            'http://localhost:3000',  
            'http://localhost:5000',
            'https://full-stack-six-coral.vercel.app',  
            'https://full-stack-six-coral.vercel.app'
        ];  

      
        if (!origin || allowedOrigins.includes(origin)) {  
            return callback(null, true);  
        }  
        

        return callback(new Error('CORS error: The origin is not allowed.'));  
    },  
});