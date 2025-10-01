import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error || !profile?.name) {
        navigate("/complete-profile");
      }
    };

    checkProfile();
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-indigo-600">ShopifyMarket</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-xl mx-auto">
          Your one-stop shop for trendy clothes, accessories, and more. Discover
          exclusive deals and fast delivery.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Easy Shopping</h2>
          <p className="text-gray-600">
            Browse our wide range of products with a seamless shopping
            experience.
          </p>
        </div>

        <div className="p-6 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Great Discounts</h2>
          <p className="text-gray-600">
            Enjoy exclusive discounts and daily deals on your favorite items.
          </p>
        </div>

        <div className="p-6 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Fast Delivery</h2>
          <p className="text-gray-600">
            Get your orders delivered quickly with our reliable shipping
            options.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
