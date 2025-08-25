import React from "react";
// import UserDetailCard from "./UserDetailCard";
// import PackageDetailCard from "../PackageDetailCard";
// import OrderLocationCard from "./OrderLocationCard";
// import UserRatingCard from "./UserRatingCard";
import UserDetailCard from "./UserDetailCard";
import PackageDetailCard from "./PackageDetailCard";
import OrderLocationCard from "./OrderLocationCard";
import UserRatingCard from "./UserRatingCard";

const EmailOrderDetails = () => {
    return (
        <div className="flex w-full bg-sky-500/10 flex-col items-center ">
            <div>
                <p className="mt-12 text-6xl p-3 bg-linear-to-r from-sky-200 to-blue-200 font-bold text-blue-900 font-serif rounded-3xl">Good Tribe Private Limited</p>
                <span className="mt-1 h-[2px] w-3/3 bg-black"></span>
            </div>

            <div className="w-full p-6">
                {/* Row 1: User Detail Card */}
                <div className="w-full">
                    <UserDetailCard />
                </div>

                {/* Row 2: Package Detail Card with 3 inner cards */}
                <div className="w-full">
                    <PackageDetailCard />


                </div>

                {/* Row 3: Order Location and User Rating side by side */}
                <div className="p-6 w-full flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <OrderLocationCard />
                    </div>
                    <div className="flex-1">
                        <UserRatingCard />
                    </div>
                </div>
                <div className=" rounded-3xl w-full bg-linear-to-r from-sky-200 to-blue-200  text-blue-800 py-4 mt-6">
                    <p className="p-2 text-center text-xl">
                        Contact Support: <span className="font-bold"> support@example.com</span> || Phone: <span className="font-bold">+91 12345 67890</span>
                    </p>
                </div>

            </div>

        </div >

    );
};

export default EmailOrderDetails;