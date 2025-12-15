import { Trash2 } from 'lucide-react';
import { PredictionRecord } from '../App';

interface HistoryPageProps {
  predictions: PredictionRecord[];
  onClearHistory: () => void;
}

export function HistoryPage({ predictions, onClearHistory }: HistoryPageProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRegionLabel = (region: string) => {
    const labels: { [key: string]: string } = {
      northwest: 'Barat Laut',
      northeast: 'Timur Laut',
      southwest: 'Barat Daya',
      southeast: 'Tenggara'
    };
    return labels[region] || region;
  };

  const getGenderLabel = (gender: string) => {
    return gender === 'male' ? 'Laki-laki' : 'Perempuan';
  };

  const getSmokerLabel = (smoker: string) => {
    return smoker === 'yes' ? 'Ya' : 'Tidak';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Riwayat Prediksi</h2>
          <p className="text-gray-600">
            {predictions.length} prediksi tersimpan
          </p>
        </div>

        {predictions.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Hapus semua riwayat?')) {
                onClearHistory();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Hapus Semua
          </button>
        )}
      </div>

      {predictions.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-900 mb-2">Belum ada riwayat</p>
          <p className="text-gray-600 mb-6">
            Prediksi yang Anda buat akan muncul di sini
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Buat Prediksi
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(prediction.timestamp)}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Usia</p>
                      <p className="text-gray-900">{prediction.inputs.age} tahun</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">BMI</p>
                      <p className="text-gray-900">{prediction.inputs.bmi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Anak</p>
                      <p className="text-gray-900">{prediction.inputs.children}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Jenis Kelamin</p>
                      <p className="text-gray-900">{getGenderLabel(prediction.inputs.gender)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Merokok</p>
                      <p className="text-gray-900">{getSmokerLabel(prediction.inputs.smoker)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Wilayah</p>
                      <p className="text-gray-900">{getRegionLabel(prediction.inputs.region)}</p>
                    </div>
                  </div>
                </div>

                <div className="border-l border-gray-200 pl-6 min-w-[180px]">
                  <p className="text-sm text-gray-500 mb-1">Prediksi Biaya</p>
                  <p className="text-3xl text-gray-900 mb-1">
                    ${prediction.predictedPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${Math.round(prediction.predictedPrice / 12).toLocaleString()}/bulan
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}