import { PredictionRecord } from '../App';
import { Activity, TrendingUp, Target, Globe, Users, Cigarette, MapPin } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface DashboardPageProps {
  predictions: PredictionRecord[];
}

export function DashboardPage({ predictions }: DashboardPageProps) {
  // Calculate statistics
  const totalPredictions = predictions.length;
  
  const averagePrediction = predictions.length > 0
    ? Math.round(predictions.reduce((sum, p) => sum + p.predictedPrice, 0) / predictions.length)
    : 0;

  // Simulate model accuracy (in real app, this would come from ML model evaluation)
  const modelAccuracy = 94.5;

  // Global average (slightly different from user's average for comparison)
  const globalAverage = 13270;

  // Get last 5 activities
  const recentActivities = [...predictions].slice(0, 5);

  // Distribution data
  const smokerDistribution = [
    {
      name: 'Perokok',
      value: predictions.filter(p => p.inputs.smoker === 'yes').length,
      color: '#9333ea'
    },
    {
      name: 'Tidak Merokok',
      value: predictions.filter(p => p.inputs.smoker === 'no').length,
      color: '#e9d5ff'
    }
  ];

  const genderDistribution = [
    {
      name: 'Laki-laki',
      value: predictions.filter(p => p.inputs.gender === 'male').length,
      color: '#9333ea'
    },
    {
      name: 'Perempuan',
      value: predictions.filter(p => p.inputs.gender === 'female').length,
      color: '#c084fc'
    }
  ];

  // Top regions
  const regionCount: { [key: string]: number } = {};
  predictions.forEach(p => {
    regionCount[p.inputs.region] = (regionCount[p.inputs.region] || 0) + 1;
  });

  const regionLabels: { [key: string]: string } = {
    northwest: 'Barat Laut',
    northeast: 'Timur Laut',
    southwest: 'Barat Daya',
    southeast: 'Tenggara'
  };

  // Ensure all 4 regions are always shown
  const allRegions = ['northwest', 'northeast', 'southwest', 'southeast'];
  const topRegions = allRegions.map(region => ({
    region: regionLabels[region],
    count: regionCount[region] || 0,
    color: '#9333ea'
  }));

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const COLORS = ['#9333ea', '#e9d5ff', '#c084fc', '#a855f7'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">
          Overview statistik dan analisis prediksi Anda
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Predictions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Prediksi</p>
          <p className="text-3xl text-gray-900">{totalPredictions}</p>
        </div>

        {/* Average Prediction */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Rata-rata Prediksi</p>
          <p className="text-3xl text-gray-900">${averagePrediction.toLocaleString()}</p>
        </div>

        {/* Model Accuracy */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Akurasi Model</p>
          <p className="text-3xl text-gray-900">{modelAccuracy}%</p>
        </div>

        {/* Global Average */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Rata-rata Global</p>
          <p className="text-3xl text-gray-900">${globalAverage.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Aktivitas Terakhir</h3>
          
          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada aktivitas
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((prediction) => (
                <div key={prediction.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">
                      ${prediction.predictedPrice.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(prediction.timestamp)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {prediction.inputs.age} tahun, BMI {prediction.inputs.bmi}
                    </p>
                    <p className="text-sm text-gray-500">
                      {prediction.inputs.smoker === 'yes' ? 'Perokok' : 'Tidak Merokok'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Smoker Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Cigarette className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Distribusi Perokok</h3>
          </div>
          
          {predictions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={smokerDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {smokerDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Distribusi Gender</h3>
          </div>
          
          {predictions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Regions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Distribusi Wilayah</h3>
          </div>
          
          {predictions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topRegions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="region" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="count" fill="#9333ea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}