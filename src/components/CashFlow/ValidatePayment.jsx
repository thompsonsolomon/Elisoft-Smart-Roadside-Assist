import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, Check, X, RefreshCw, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { VerifyPayment } from '../../utils/api';


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
};

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference') || searchParams.get('ref') || '';

  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'failed' | 'notfound'
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('We are verifying your payment — hang tight.');
  const [isManual, setIsManual] = useState(false);

  const abortRef = useRef(false);
  const attemptsRef = useRef(0);
  const intervalRef = useRef(null);

  const MAX_ATTEMPTS = 6;
  const RETRY_INTERVAL = 4000; // 4s
  const AUTO_REDIRECT_SECONDS = 5;

  useEffect(() => {
    abortRef.current = false;
    attemptsRef.current = 0;
    setAttempts(0);

    if (!reference) {
      setStatus('notfound');
      setMessage('No payment reference found in the URL.');
      return;
    }

    const attemptVerify = async () => {
      try {
        attemptsRef.current += 1;
        setAttempts(attemptsRef.current);

        const res = await VerifyPayment(reference);
        console.log('Verification response:', res);

        if (res?.data?.status === 'success' && res?.data?.data?.payment) {
          const p = res.data.data.payment;

          if (['Completed', 'Paid', 'Success'].includes(p.status)) {
            setStatus('success');
            setMessage('Payment verified successfully.');
            toast.success('Payment verified');
            clearInterval(intervalRef.current);
            setTimeout(() => navigate('/profile', { replace: true }), AUTO_REDIRECT_SECONDS * 1000);
            return;
          } else {
            setMessage('Payment found but not completed yet. Checking again...');
          }
        } else if (res?.data?.status === 'error') {
          setMessage(res?.data?.message || 'Payment not verified yet.');
        }

        if (attemptsRef.current >= MAX_ATTEMPTS) {
          clearInterval(intervalRef.current);
          setStatus('failed');
          setMessage('Could not verify payment. Try again manually.');
        }
      } catch (err) {
        console.error('Verification error:', err);

        if (attemptsRef.current >= MAX_ATTEMPTS) {
          clearInterval(intervalRef.current);
          setStatus('failed');
          setMessage('Verification failed due to network error.');
        } else {
          setMessage('Network error — retrying...');
        }
      }
    };

    // First attempt immediately
    attemptVerify();

    // Then poll
    intervalRef.current = setInterval(() => {
      if (!abortRef.current) attemptVerify();
    }, RETRY_INTERVAL);

    return () => {
      abortRef.current = true;
      clearInterval(intervalRef.current);
    };
  }, [reference, navigate]);

  const handleManualVerify = async () => {
    setIsManual(true);
    try {
      const res = await VerifyPayment(reference);
      if (res?.data?.status === 'success' && res?.data?.data?.payment) {
        const p = res.data.data.payment;
        if (['Completed', 'Paid', 'Success'].includes(p.status)) {
          setStatus('success');
          setMessage('Payment verified successfully.');
          toast.success('Payment verified');
          setTimeout(() => navigate('/profile', { replace: true }), AUTO_REDIRECT_SECONDS * 1000);
          return;
        }
      }
      setMessage('Payment still not verified. If you just paid, wait a few moments then try again.');
      toast.info('Payment not verified yet');
    } catch (err) {
      console.error(err);
      toast.error('Verification failed');
      setMessage('Verification failed — please try again later.');
    } finally {
      setIsManual(false);
    }
  };

  const handleRetry = () => {
    attemptsRef.current = 0;
    setAttempts(0);
    setStatus('verifying');
    setMessage('Retrying verification...');
  };

  const handleOpenPaystack = () => {
    window.open(`https://dashboard.paystack.com/transactions?query=${reference}`, '_blank');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <AnimatePresence>
        <motion.div
          className="w-full max-w-3xl bg-gradient-to-br from-black/80 via-black/90 to-black/95 border border-yellow-600/30 rounded-2xl p-8 shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <div className="w-36 h-36 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#000000 0%, #111 50%, #FFD700 100%)' }}>
                <AnimatePresence>
                  {status === 'verifying' && (
                    <motion.div key="loader" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 className="animate-spin text-white" size={56} />
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div key="success" initial={{ scale: 0.8, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} exit={{ opacity: 0 }}>
                      <div className="bg-white rounded-full p-3">
                        <Check className="text-black" size={56} />
                      </div>
                    </motion.div>
                  )}

                  {status === 'failed' && (
                    <motion.div key="failed" initial={{ scale: 0.8, rotate: 10 }} animate={{ scale: 1, rotate: 0 }} exit={{ opacity: 0 }}>
                      <div className="bg-white rounded-full p-3">
                        <X className="text-black" size={56} />
                      </div>
                    </motion.div>
                  )}

                  {status === 'notfound' && (
                    <motion.div key="notfound" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                      <div className="bg-white rounded-full p-3">
                        <X className="text-black" size={56} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex-1">
              <motion.h1 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-3" layout>
                {status === 'verifying' && 'Verifying Payment'}
                {status === 'success' && 'Payment Successful'}
                {status === 'failed' && 'Verification Failed'}
                {status === 'notfound' && 'Reference Not Found'}
              </motion.h1>

              <motion.p className="text-gray-300 mb-4" layout>
                {message}
              </motion.p>

              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-black/60 border border-yellow-600/20 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-400">Reference</span>
                  <span className="text-sm font-mono text-yellow-300">{reference || '—'}</span>
                </div>

                {status !== 'success' && reference && (
                  <button
                    onClick={handleManualVerify}
                    disabled={isManual}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
                  >
                    {isManual ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <RefreshCw size={16} />
                    )}
                    Verify Now
                  </button>
                )}

                {reference && (
                  <button
                    onClick={() => navigator.clipboard.writeText(reference).then(() => toast.info('Reference copied'))}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-yellow-600/20 text-yellow-300 hover:bg-black/70 transition"
                  >
                    Copy
                  </button>
                )}

                {reference && (
                  <button
                    onClick={handleOpenPaystack}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-yellow-600/20 text-white hover:bg-black/70 transition"
                  >
                    <ExternalLink size={14} />
                    Open in Paystack
                  </button>
                )}

                {status === 'failed' && (
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-yellow-500 text-yellow-300 hover:bg-yellow-500/10 transition"
                  >
                    Retry
                  </button>
                )}

                <button
                  onClick={() => navigate(-1)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-yellow-600/20 text-gray-300 hover:bg-black/70 transition"
                >
                  Close
                </button>
              </div>

              {/* Progress + attempts */}
              <div className="mt-6">
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((attempts / MAX_ATTEMPTS) * 100, 100)}%` }}
                    transition={{ ease: 'easeOut', duration: 0.6 }}
                    style={{ background: 'linear-gradient(90deg, #FFD700, #FFA500)' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>Attempts: {attempts}/{MAX_ATTEMPTS}</span>
                  <span>{status === 'success' ? `Redirecting in ${AUTO_REDIRECT_SECONDS}s` : status === 'verifying' ? 'Auto-checking...' : ''}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <motion.div className="mt-8 text-sm text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>
              If your payment was successful but verification still fails, please contact support with your reference or check your transaction on your bank/Paystack dashboard.
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PaymentVerification;
