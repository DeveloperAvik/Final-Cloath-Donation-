import errorPage from "../assets/404-Page-Cover-1270156386.png";

function ErrorPage() {
    return (
        <div className="flex justify-center items-center h-screen m-0">
            <img 
                src={errorPage} 
                alt="404 Error" 
                className="max-w-full h-auto sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%]"
            />
        </div>
    );
}

export default ErrorPage;
