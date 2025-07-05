'use client'

import React from 'react';
import { Heart, ArrowRight, Shield, Users, Target } from 'lucide-react';
import NavUser from '../../components/NavUser';

export default function HomeUser() {
  return (
    <>
    <NavUser />

    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
              <Heart className="w-4 h-4 text-red-500" />
              Platform Donasi Terpercaya
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Berbagi Kebaikan
              <br />
              <span className="text-gray-600">Bersama AksaraPeduli</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Platform donasi yang menghubungkan hati dermawan dengan mereka yang membutuhkan. Wujudkan perubahan nyata
              dengan donasi yang transparan dan terpercaya.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Mulai Berdonasi
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-red-500 transition-colors duration-300">
                50,000+
              </div>
              <div className="text-gray-600">Donatur Aktif</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                Rp 2.5M+
              </div>
              <div className="text-gray-600">Dana Terkumpul</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-green-500 transition-colors duration-300">
                1,200+
              </div>
              <div className="text-gray-600">Kampanye Berhasil</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih AksaraPeduli?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami berkomitmen memberikan pengalaman donasi yang aman, transparan, dan bermakna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors duration-300">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparan & Aman</h3>
              <p className="text-gray-600 leading-relaxed">
                Setiap donasi dapat dilacak secara real-time. Sistem keamanan berlapis untuk melindungi data dan dana
                Anda.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Komunitas Peduli</h3>
              <p className="text-gray-600 leading-relaxed">
                Bergabung dengan ribuan donatur yang telah mempercayai platform kami untuk berbagi kebaikan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dampak Nyata</h3>
              <p className="text-gray-600 leading-relaxed">
                Lihat langsung bagaimana donasi Anda memberikan perubahan positif bagi mereka yang membutuhkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Mulai Berbagi Kebaikan Hari Ini</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Setiap donasi, sekecil apapun, memiliki kekuatan untuk mengubah hidup seseorang. Mari bersama-sama
              menciptakan dunia yang lebih baik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-10 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Donasi Sekarang
              </button>
              <button className="border border-gray-300 text-gray-700 px-10 py-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
                Buat Kampanye
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">AksaraPeduli</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Platform donasi terpercaya yang menghubungkan hati dermawan dengan mereka yang membutuhkan. Bersama kita
                wujudkan perubahan nyata.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Cara Donasi</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Buat Kampanye</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Tentang Kami</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Kontak</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Pusat Bantuan</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Kebijakan Privasi</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">Syarat & Ketentuan</li>
                <li className="hover:text-white transition-colors duration-200 cursor-pointer">FAQ</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AksaraPeduli. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}