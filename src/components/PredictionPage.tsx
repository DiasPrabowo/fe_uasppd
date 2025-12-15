import { useState } from 'react';
import { PredictionRecord } from '../App';

interface PredictionPageProps {
  onAddPrediction: (prediction: PredictionRecord) => void;
}

export function PredictionPage({ onAddPrediction }: PredictionPageProps) {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    children: '',
    gender: 'male',
    smoker: 'no',
    region: 'northwest',
  });

  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate ML prediction calculation
    setTimeout(() => {
      // Simple mock prediction formula (in real app, this would call an ML API)
      const age = parseFloat(formData.age);
      const bmi = parseFloat(formData.bmi);
      const children = parseInt(formData.children);
      const smokerMultiplier = formData.smoker === 'yes' ? 2.5 : 1;
      const genderMultiplier = formData.gender === 'male' ? 1.1 : 1;
      
      const basePrice = 3000 + (age * 250) + (bmi * 100) + (children * 500);
      const predicted = basePrice * smokerMultiplier * genderMultiplier;

      const predictedPrice = Math.round(predicted);
      setResult(predictedPrice);
      setIsCalculating(false);

      // Save to history
      const prediction: PredictionRecord = {
        id: Date.now().toString(),
        timestamp: new Date(),
        inputs: {
          age,
          bmi,
          children,
          gender: formData.gender,
          smoker: formData.smoker,
          region: formData.region,
        },
        predictedPrice,
      };
      onAddPrediction(prediction);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Prediksi Biaya Asuransi</h2>
        <p className="text-gray-600">
          Masukkan data untuk mendapatkan estimasi biaya asuransi kesehatan
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="age" className="block text-sm text-gray-700 mb-2">
                Usia (tahun)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="18"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                placeholder="35"
              />
            </div>

            <div>
              <label htmlFor="bmi" className="block text-sm text-gray-700 mb-2">
                BMI (Body Mass Index)
              </label>
              <input
                type="number"
                id="bmi"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                required
                step="0.1"
                min="10"
                max="60"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                placeholder="24.5"
              />
            </div>

            <div>
              <label htmlFor="children" className="block text-sm text-gray-700 mb-2">
                Jumlah Anak
              </label>
              <input
                type="number"
                id="children"
                name="children"
                value={formData.children}
                onChange={handleChange}
                required
                min="0"
                max="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                placeholder="2"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm text-gray-700 mb-2">
                Jenis Kelamin
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              >
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <div>
              <label htmlFor="smoker" className="block text-sm text-gray-700 mb-2">
                Status Merokok
              </label>
              <select
                id="smoker"
                name="smoker"
                value={formData.smoker}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              >
                <option value="no">Tidak Merokok</option>
                <option value="yes">Merokok</option>
              </select>
            </div>

            <div>
              <label htmlFor="region" className="block text-sm text-gray-700 mb-2">
                Wilayah
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
              >
                <option value="northwest">Barat Laut</option>
                <option value="northeast">Timur Laut</option>
                <option value="southwest">Barat Daya</option>
                <option value="southeast">Tenggara</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? 'Menghitung...' : 'Hitung Prediksi'}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Hasil Prediksi</h3>

          {result !== null ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Biaya Tahunan</p>
                <p className="text-4xl text-gray-900">
                  ${result.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Biaya Per Bulan</span>
                  <span className="text-gray-900">
                    ${Math.round(result / 12).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Kategori</span>
                  <span className="text-gray-900">
                    {result < 5000 ? 'Rendah' : result < 15000 ? 'Menengah' : 'Tinggi'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
                Hasil ini adalah estimasi berdasarkan model machine learning. 
                Biaya aktual dapat bervariasi.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-center">
              <p className="text-gray-500">
                Isi formulir untuk melihat prediksi
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}