import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign(//jwt.sign method generates a token
        {userId: userId},//set token userId attribute to userid received
        process.env.JWT_SECRET, //set secret to secret stored in process.env.JWT_SECRET
        // {expiresIn: '120d'} // set to expire in 60 days
    )

    //set this token as HTTP-Only cookie
    //token will be stored in server as http only cookie, 
    //and sent with every req after log in
    res.cookie('jwt', token, {
        //set attributes
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', //true if not development
        sameSite: 'strict',
        // maxAge: 120 * 24 * 60 * 60 * 1000 //120d * 24h * 60m * 60s * 1000ms   
    })

}

export default generateToken;

// import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '90d',
//   });

//   // Set JWT as an HTTP-Only cookie
//   res.cookie('jwt', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
//     sameSite: 'strict', // Prevent CSRF attacks
//     maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
//   });
// };

//export default generateToken;

    