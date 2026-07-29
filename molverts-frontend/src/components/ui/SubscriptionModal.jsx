import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, Sparkles, Check } from 'lucide-react';

const features = [
  'Accès complet aux 26 provinces',
  'Fiches moléculaires détaillées en 3D',
  'Export PDF pour publications scientifiques',
  'Recherche avancée par pathologie',
  'Accès prioritaire aux nouvelles données',
];

const SubscriptionModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass rounded-2xl p-8 max-w-md w-full pointer-events-auto neon-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-emerald to-neon-emerald-dark flex items-center justify-center neon-glow">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Accès Chercheur Premium</h3>
                    <p className="text-neon-emerald-light text-sm">Molverts-Congo</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Débloquez l&apos;intégralité de l&apos;Atlas Moléculaire 3D pour vos recherches
                et présentations au Conseil Scientifique National.
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-200">
                    <Check className="w-4 h-4 text-neon-emerald flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-emerald to-neon-emerald-dark text-white font-semibold flex items-center justify-center gap-2 neon-glow"
                >
                  <Sparkles className="w-5 h-5" />
                  Activer l&apos;abonnement Premium
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Continuer en mode démo
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;
