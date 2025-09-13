const Footer = () => {
    return (
      <footer className="w-full text-gray-300 text-center py-2 mt-10 bg-[#1B1F3B]/80 backdrop-blur-md border-t border-[#4D869C] shadow-md">
        <p className="w-full">
          © {new Date().getFullYear()} KeyMate &nbsp; | &nbsp; All rights reserved &nbsp; | &nbsp; Developed by Riddhi Jain.
        </p>
      </footer>
    );
};

export default Footer;
