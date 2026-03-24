/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Lesson } from './pages/Lesson';
import { Quiz } from './pages/Quiz';
import { EssayTrainer } from './pages/EssayTrainer';
import { AITutor } from './pages/AITutor';
import { Analysis } from './pages/Analysis';
import { Textbook } from './pages/Textbook';
import { Generator } from './pages/Generator';
import { Profile } from './pages/Profile';
import { useStore } from './store/useStore';

export default function App() {
  const { checkStreak } = useStore();

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/essay" element={<EssayTrainer />} />
          <Route path="/tutor" element={<AITutor />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/textbook" element={<Textbook />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}
