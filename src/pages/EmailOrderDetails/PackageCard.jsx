import React, { useState } from "react";
import { CheckCircle, Package } from "lucide-react"; // Package icon from lucide-react


const PackageCard = () => {
  const steps = ["Design & Cutting ", "Stiching Finishing", "Order Packed", "Order Shipped", "Out for Delivery", "Delivered"];
  const [currentStep] = useState(3);

  return (
    <div className="flex mt-1 w-full  p-6 ">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full text-center">

        {/* Icon Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-sky-100 p-6 rounded-full shadow-lg">
            <Package className="w-20 h-20 text-sky-500" />
          </div>
        </div>

        {/* Text Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-3">Dear Tanishtha!</h2>
        <p className=" text-gray-600 text-lg">
          Your package is shipped. We are happy to inform you that your package is
          on the way.
        </p>
        <p className="mt-2 mb-5 font-semibold">Stay tuned!</p>
        <div className="mt-12">
          <h3 className="text-5xl font-bold mb-9 text-gray-800">🚚 Order Progress</h3>

          <div className="mb-5 relative flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">
                {/* Circle */}
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full z-10 ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </span>

                {/* Step Label */}
                <p
                  className={`mt-2 text-sm font-semibold text-center ${index <= currentStep ? "text-blue-600" : "text-gray-500"
                    }`}
                >
                  {step}
                </p>

                {/* Dashed connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-3 left-1/2 w-full h-0.5 ${index < currentStep ? "border-t-2 border-dashed border-blue-400" : "border-t-2 border-dashed border-gray-300"
                      }`}
                    style={{ zIndex: 0 }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Current Step Info */}
          <div className="mt-10 text-sm text-gray-500">
            Current Step: <span className="font-semibold">{steps[currentStep]}</span>
          </div>
        </div>
        <p className="mt-9 text-gray-600 text-lg">
          Estimed Delivery by 12th September , 2025!
        </p>
        <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Track your Order !
        </button>

      </div>



    </div>
  );
};

export default PackageCard;