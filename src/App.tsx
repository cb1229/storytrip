import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { StorySelectPage } from './pages/StorySelectPage';
import { TripDetailsPage } from './pages/TripDetailsPage';
import { LiveCapturePage } from './pages/LiveCapturePage';
import { DocumentaryPage } from './pages/DocumentaryPage';
import { ProfilePage } from './pages/ProfilePage';
import { TripsGalleryPage } from './pages/TripsGalleryPage';
import { PhoneFrame } from './components/common/PhoneFrame';
import { ToastContainer } from './components/common/Toast';
import { useToastStore } from './hooks/useToast';

function App() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-4">
      <h1 className="text-white text-2xl font-bold mb-2">StoryTrip UX Prototype</h1>
      <p className="text-slate-400 mb-6 text-center">Interactive prototype • Click through to explore</p>

      <PhoneFrame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-story" element={<StorySelectPage />} />
          <Route path="/trip/:narrativeId" element={<TripDetailsPage />} />
          <Route path="/live/:tripId" element={<LiveCapturePage />} />
          <Route path="/documentary/:tripId" element={<DocumentaryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/trips-gallery" element={<TripsGalleryPage />} />
        </Routes>
      </PhoneFrame>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
