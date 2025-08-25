import { useState } from "react";
// import earbud from '../../assets/earbud.png'

const PackageDetailCard = () => {
    const images = [
        // earbud,
        "https://via.placeholder.com/150/0000FF/808080",
        "https://via.placeholder.com/150/FF0000/FFFFFF",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full p-6">
            {/* Card 1: Package Details */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex-1">
                <h2 className="text-2xl font-bold mb-4">📦 Package Details</h2>
                <p><span className="font-semibold">Order ID:</span> #123456</p>
                <p><span className="font-semibold">Item:</span> Wireless Earbuds</p>
                <p><span className="font-semibold">Delivery By:</span> Aug 25, 2025</p>
                <p><span className="font-semibold">Delivery Agent:</span> John Doe</p>
                <p><span className="font-semibold">Contact:</span> +91 9876543210</p>
                <p><span className="font-semibold">Estimated Delivery:</span> Aug 25, 2025</p>
            </div>

            {/* Card 2: Order Details */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex-1">
                <h2 className="text-2xl font-bold mb-4">📝 Order Details</h2>
                <p><span className="font-semibold">Order Name:</span> Wireless Earbuds</p>
                <p><span className="font-semibold">Payment:</span> Paid</p>
                <p><span className="font-semibold">Shipping:</span> Express Delivery</p>
                <p><span className="font-semibold">Address:</span> 123 Main St, New Delhi</p>
                <p><span className="font-semibold">Contact Person:</span> Jane Smith</p>
                <p><span className="font-semibold">Phone:</span> +91 9876543211</p>
            </div>

            {/* Card 3: Images Carousel */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex-1 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">🖼️ Order Images</h2>
                <div className="w-full h-56 relative">
                    <img
                        src={images[currentIndex]}
                        alt={`Package ${currentIndex + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1"
                            >
                                ◀
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1"
                            >
                                ▶
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PackageDetailCard;