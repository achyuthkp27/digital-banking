'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DemoDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoDialog({ open, onClose }: DemoDialogProps) {
  const t = useTranslations('DemoDialog');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="bg-[var(--bg-surface)] border border-[rgba(var(--color-invert-rgb),0.1)] rounded-2xl w-full max-w-lg shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-4 border-b border-[rgba(var(--color-invert-rgb),0.05)]">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{t('title')}</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{t('subtitle')}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2 rounded-full hover:bg-[rgba(var(--color-invert-rgb),0.05)]"
            aria-label={t('close')}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm text-[var(--text-secondary)]">{t('firstName')} *</label>
                <input
                  required
                  type="text"
                  className="w-full bg-[rgba(var(--color-invert-rgb),0.03)] border border-[rgba(var(--color-invert-rgb),0.1)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[rgba(var(--color-invert-rgb),0.3)] transition-colors"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm text-[var(--text-secondary)]">{t('lastName')} *</label>
                <input
                  required
                  type="text"
                  className="w-full bg-[rgba(var(--color-invert-rgb),0.03)] border border-[rgba(var(--color-invert-rgb),0.1)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[rgba(var(--color-invert-rgb),0.3)] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-secondary)]">{t('workEmail')} *</label>
              <input
                required
                type="email"
                className="w-full bg-[rgba(var(--color-invert-rgb),0.03)] border border-[rgba(var(--color-invert-rgb),0.1)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[rgba(var(--color-invert-rgb),0.3)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-secondary)]">{t('companyName')} *</label>
              <input
                required
                type="text"
                className="w-full bg-[rgba(var(--color-invert-rgb),0.03)] border border-[rgba(var(--color-invert-rgb),0.1)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[rgba(var(--color-invert-rgb),0.3)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[var(--text-secondary)]">{t('productInterest')}</label>
              <select
                defaultValue=""
                className="w-full bg-[rgba(var(--color-invert-rgb),0.03)] border border-[rgba(var(--color-invert-rgb),0.1)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[rgba(var(--color-invert-rgb),0.3)] transition-colors appearance-none"
              >
                <option value="" disabled hidden></option>
                <option value="video-kyc" className="bg-[var(--bg-surface)]">
                  {t('videoKyc')}
                </option>
                <option value="kiosk" className="bg-[var(--bg-surface)]">
                  {t('kioskBanking')}
                </option>
                <option value="agent" className="bg-[var(--bg-surface)]">
                  {t('agentBanking')}
                </option>
                <option value="merchant" className="bg-[var(--bg-surface)]">
                  {t('merchantBanking')}
                </option>
                <option value="corporate" className="bg-[var(--bg-surface)]">
                  {t('corporateBanking')}
                </option>
                <option value="mobile" className="bg-[var(--bg-surface)]">
                  {t('mobileBanking')}
                </option>
                <option value="other" className="bg-[var(--bg-surface)]">
                  {t('other')}
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-accent text-black font-semibold py-3 rounded-full hover:brightness-110 transition-all focus:outline-none"
            >
              {t('submitRequest')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
