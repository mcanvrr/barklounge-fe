'use client';

import {
  Button,
  Card,
  Input,
  Section,
  Select,
  Textarea,
} from '@/components/ui';
import { PET_TYPES } from '@/data';
import type { AppSettings } from '@/lib/api/services/appSettings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetContactState,
  sendContactMessage,
} from '@/store/slices/contactSlice';
import type { ContactInfo } from '@/types';
import { ContactFormData, FormErrors } from '@/types';
import { hasFormErrors, validateForm } from '@/utils/validation';
import { Clock, Heart, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';

// ContactInfoCard Component
const ContactInfoCard: React.FC<{ item: ContactInfo }> = ({ item }) => {
  return (
    <div className='group hover:bg-white/10 p-6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5'>
      <div className='flex items-start gap-4'>
        <div className='w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-xl flex items-center justify-center group-hover:from-pink-400/30 group-hover:to-purple-400/30 transition-all duration-300'>
          {item.title === 'E-posta' && <Mail className='w-6 h-6 text-white' />}
          {item.title === 'Telefon' && <Phone className='w-6 h-6 text-white' />}
          {item.title === 'Adres' && <Heart className='w-6 h-6 text-white' />}
          {item.title === 'Çalışma Saatleri' && (
            <Clock className='w-6 h-6 text-white' />
          )}
        </div>
        <div className='flex-1'>
          <h4 className='text-white/90 text-sm font-semibold mb-2 group-hover:text-white transition-colors duration-300'>
            {item.title}
          </h4>
          <p className='text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300'>
            {item.info}
          </p>
        </div>
      </div>
    </div>
  );
};

// ContactInfo Component
const ContactInfo: React.FC<{ appSettings: AppSettings | null }> = ({
  appSettings,
}) => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      info: appSettings?.phone_number || '+90 546 246 9237',
      description: '7/24 hizmet',
    },
    {
      icon: Mail,
      title: 'E-posta',
      info: appSettings?.email_address || 'barkloungetr@gmail.com',
      description: 'Hızlı yanıt',
    },
    {
      icon: MapPin,
      title: 'Adres',
      info:
        appSettings?.location ||
        'Bahçelievler Mahallesi Ali Rıza Kuzucan Sk. No:50/B\n34180 İstanbul',
      description: 'İstanbul, Türkiye',
    },
  ];

  return (
    <div className='lg:col-span-4 space-y-6'>
      <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 relative overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-2xl'></div>
        <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-xl'></div>

        <div className='relative z-10'>
          <div className='mb-6'>
            <h3 className='text-xl font-bold text-white mb-2'>
              İletişim Bilgileri
            </h3>
            <p className='text-white/70 text-sm'>Size en uygun yolu seçin</p>
          </div>
          <div className='space-y-4'>
            {contactInfo.map((item, index) => (
              <ContactInfoCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ContactForm Component
const ContactForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector(state => state.contact);
  const petTypes = PET_TYPES;
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    pet_type: undefined,
  });

  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (validationErrors[name as keyof FormErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (hasFormErrors(validationErrors)) {
      setValidationErrors(validationErrors);
      return;
    }

    // API'ye gönderilecek veri formatını hazırla
    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      pet_type: formData.pet_type,
      subject: formData.subject,
      message: formData.message,
    };

    dispatch(sendContactMessage(contactData));
  };

  // Form başarıyla gönderildiğinde resetle
  React.useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        pet_type: undefined,
      });
      setValidationErrors({});
      // 3 saniye sonra success state'ini temizle
      setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);
    }
  }, [success, dispatch]);

  return (
    <div className='relative'>
      {/* Form background decoration */}
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl blur-3xl'></div>

      <form onSubmit={handleSubmit} className='relative z-10 space-y-6 p-8'>
        {/* Form header */}
        <div className='text-center mb-8'>
          <h3 className='text-2xl font-bold text-white mb-2'>Mesaj Gönderin</h3>
          <p className='text-white/70 text-sm'>
            Size en kısa sürede dönüş yapacağız
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Input
              label='Ad Soyad *'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              variant='dark'
              placeholder='Adınızı giriniz'
              error={validationErrors.name}
              className='bg-white/5 border-white/20 focus:border-pink-400/50 focus:ring-pink-400/20'
            />
          </div>
          <div className='space-y-2'>
            <Input
              label='E-posta *'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              variant='dark'
              placeholder='E-posta adresiniz'
              error={validationErrors.email}
              className='bg-white/5 border-white/20 focus:border-pink-400/50 focus:ring-pink-400/20'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Input
              label='Telefon'
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              variant='dark'
              placeholder='Telefon numaranız'
              error={validationErrors.phone}
              className='bg-white/5 border-white/20 focus:border-blue-400/50 focus:ring-blue-400/20'
            />
          </div>
          <div className='space-y-2'>
            <Select
              label='Pet Türü'
              name='pet_type'
              value={formData.pet_type}
              onChange={handleInputChange}
              variant='dark'
              options={petTypes}
              placeholder='Seçiniz'
              className='bg-white/5 border-white/20 focus:border-purple-400/50 focus:ring-purple-400/20'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Input
            label='Konu *'
            name='subject'
            value={formData.subject}
            onChange={handleInputChange}
            variant='dark'
            placeholder='Mesaj konunuz'
            error={validationErrors.subject}
            className='bg-white/5 border-white/20 focus:border-purple-400/50 focus:ring-purple-400/20'
          />
        </div>

        <div className='space-y-2'>
          <Textarea
            label='Mesajınız *'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            variant='dark'
            rows={4}
            placeholder='Mesajınızı yazın...'
            error={validationErrors.message}
            className='bg-white/5 border-white/20 focus:border-pink-400/50 focus:ring-pink-400/20'
          />
        </div>

        <div className='pt-4'>
          {success && (
            <div className='p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center font-medium'>
              ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş
              yapacağız.
            </div>
          )}

          {error && (
            <div className='p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-center font-medium'>
              ❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
            </div>
          )}

          <Button
            type='submit'
            variant='primary'
            size='lg'
            loading={loading}
            disabled={loading || success}
            className='w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {!loading && !success && <Send className='w-5 h-5 mr-2' />}
            {loading
              ? 'Gönderiliyor...'
              : success
              ? '✅ Gönderildi!'
              : 'Mesajı Gönder'}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Main ContactFormSection Component
const ContactFormSection: React.FC<{ appSettings?: AppSettings | null }> = ({
  appSettings,
}) => {
  // Fallback to Redux if no SSR props
  const { settings: reduxSettings } = useAppSelector(
    state => state.appSettings
  );
  const finalSettings = appSettings || reduxSettings;

  return (
    <Section
      id='iletisim'
      background='dark'
      padding='sm'
      className='relative overflow-hidden'
    >
      {/* Enhanced Background Animations */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className='container mx-auto relative z-10 px-4 sm:px-6 lg:px-8'>
        {/* Enhanced Header */}
        <div className='text-center mb-12 sm:mb-16'>
          <div className='inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 sm:px-8 py-3 rounded-2xl sm:rounded-3xl text-white text-sm sm:text-base font-medium mb-6 sm:mb-8 border border-white/20 shadow-lg'>
            <div className='w-8 h-8 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-lg flex items-center justify-center'>
              <Heart className='w-4 h-4 sm:w-5 sm:h-5 text-pink-400' />
            </div>
            <span>Size Nasıl Yardımcı Olabiliriz?</span>
          </div>
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight'>
            İletişime{' '}
            <span className='bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent'>
              Geçin
            </span>
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Dostlarınız için en iyi hizmeti sunmak üzere 7/24 yanınızdayız.
            <br className='hidden sm:block' />
            Sorularınız için hemen iletişime geçin!
          </p>
        </div>

        {/* Enhanced Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start'>
          <ContactInfo appSettings={finalSettings} />

          <div className='lg:col-span-8'>
            <Card className='bg-white/10 backdrop-blur-md border-white/20 shadow-2xl shadow-white/5 relative overflow-hidden'>
              {/* Card background decoration */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400/5 to-purple-400/5 rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/5 to-cyan-400/5 rounded-full blur-2xl'></div>

              <ContactForm />
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Export main component and sub-components
export default ContactFormSection;
export { ContactForm, ContactInfo, ContactInfoCard };
