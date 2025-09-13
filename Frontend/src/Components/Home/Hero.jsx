import React from 'react';
import { FaShieldAlt } from "react-icons/fa"; 

function Hero() {
    return (
        <>
            <div className="flex flex-col items-center justify-center flex-grow px-6 text-center pt-10 mt-36">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white animate-fadeIn">
                    Secure & Manage Your <span className="text-[#81c3d7]">Passwords</span>
                </h1>
                <p className="text-base sm:text-lg mt-4 max-w-xl text-gray-200 animate-fadeIn">
                    Keep all your credentials safe with <span className="font-bold">KeyMate</span>'s encrypted storage.
                </p>
                
              <img 
                src="/mainele.gif" 
                alt="Security Illustration"
                className="mt-10 sm:mt-12 md:mt-16 w-[70%] sm:w-[50%] md:w-[500px] h-auto rounded-lg"
                />



                
                <div className="my-16 sm:my-20 mb-32 sm:mb-40 text-gray-300 max-w-4xl sm:max-w-5xl text-lg sm:text-2xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#81c3d7] pb-4">Why is CipherPass Secure?</h2>
                    <p className="mt-2">
                        KeyMate encrypts your passwords using <span className="font-bold">RSA (Rivest-Shamir-Adleman)</span>, an industry-standard encryption algorithm. 
                        Your credentials are stored securely using <span className="font-bold">asymmetric encryption</span>, ensuring that only you have access to your private keys.
                    </p>
                    <p className="mt-2">
                        You can also generate and manage your own <span className="font-bold">client-side RSA key pairs</span> to enhance security and control over your data.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Hero;
