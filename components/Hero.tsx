"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    setBanglaDate(getBanglaDate());
  }, []);

  return (
    <section className="w-full bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-6 sm:p-8 lg:p-10 my-6 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 flex flex-col items-start gap-3 sm:gap-4">
          <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-[#05893e] bg-[#05893e]/10 border border-[#05893e]/20">
            {banglaDate || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"}
          </div>

          <h1 className="text-2xl sm:text-[34px] lg:text-[36px] font-bold text-[#1d271f] leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-[15px] sm:text-base font-normal text-[#1d271f]/80 leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-1">
            <Link
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] border border-[#047f39] shadow-xs transition"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[315px] flex items-center justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর"
              width={315}
              height={263}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
