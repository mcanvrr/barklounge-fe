export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Köpek Bakımında Dikkat Edilmesi Gereken 5 Önemli Nokta',
    slug: 'kopek-bakiminda-dikkat-edilmesi-gereken-5-onemli-nokta',
    excerpt:
      'Köpeğinizin sağlıklı ve mutlu bir yaşam sürmesi için dikkat etmeniz gereken temel bakım ipuçları.',
    content: `Köpek sahiplerinin en önemli sorumluluklarından biri, dostlarının sağlıklı ve mutlu bir yaşam sürmesini sağlamaktır. Bu yazıda, köpek bakımında dikkat edilmesi gereken 5 önemli noktayı ele alacağız.

1. Düzenli Veteriner Kontrolleri
Köpeğinizin sağlığını korumak için en az yılda bir kez veteriner kontrolünden geçirmek önemlidir. Yaşlı köpekler için bu süre 6 ayda bir olmalıdır.

2. Beslenme Alışkanlıkları
Kaliteli mama seçimi ve düzenli beslenme saatleri köpeğinizin sağlığı için kritiktir. Yaş ve boyutuna uygun mama miktarları belirlenmelidir.

3. Günlük Egzersiz
Her köpek cinsi farklı egzersiz ihtiyaçlarına sahiptir. Düzenli yürüyüş ve oyun köpeğinizin fiziksel ve mental sağlığı için şarttır.

4. Diş Bakımı
Ağız hijyeni köpekler için çok önemlidir. Düzenli diş fırçalama ve veteriner diş kontrolleri ile dental problemleri önleyebilirsiniz.

5. Sosyal İhtiyaçlar
Köpekler sosyal hayvanlardır. Diğer köpekler ve insanlarla etkileşim kurma fırsatları sunmak gelişimleri için önemlidir.`,
    coverImage:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    author: 'Bark&Lounge',
    publishDate: '2025-01-15',
    tags: ['köpek bakımı', 'sağlık', 'beslenme'],
  },
  {
    id: '2',
    title: 'Köpek Oteli Seçerken Nelere Dikkat Edilmeli?',
    slug: 'kopek-oteli-secerken-nelere-dikkat-edilmeli',
    excerpt:
      'Tatiliniz sırasında köpeğinizi güvenle emanet edebileceğiniz bir köpek oteli seçmenin püf noktaları.',
    content: `Köpek oteli seçimi, evcil dostunuzun güvenliği ve konforu için kritik bir karardır. İşte köpek oteli seçerken dikkat etmeniz gereken önemli faktörler.

Temizlik ve Hijyen
Otelin genel temizliği, köpek odalarının hijyeni ve ortak alanların bakımı ilk kontrol etmeniz gereken noktalar olmalıdır.

Personelin Deneyimi
Otelde çalışan personelin köpek bakımı konusunda deneyimli olması ve acil durumlar için eğitimli olması önemlidir.

Güvenlik Önlemleri
Otel tesislerinin güvenli olması, kaçış riski bulunmaması ve köpeklerin birbirinden izole edilebilmesi gerekir.

Veteriner Hizmetleri
Acil durumlarda veteriner hizmetlerine hızlı ulaşım imkanı olan otelleri tercih etmelisiniz.

Aktivite ve Sosyalleşme
Köpeğinizin günlük egzersiz ve sosyalleşme ihtiyaçlarını karşılayacak aktivite programları olmalıdır.`,
    coverImage:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop',
    author: 'Bark&Lounge',
    publishDate: '2025-01-10',
    tags: ['köpek oteli', 'tatil', 'güvenlik'],
  },
  {
    id: '3',
    title: 'Köpeklerde Sosyalleşmenin Önemi',
    slug: 'kopeklerde-sosyallesmenin-onemi',
    excerpt:
      'Köpeğinizin diğer köpeklerle ve insanlarla sağlıklı ilişkiler kurmasının önemi ve yöntemleri.',
    content: `Köpeklerin sosyal varlıklar olduğunu unutmamak gerekir. Sosyalleşme, köpeğinizin davranışsal gelişimi için çok önemlidir.

Erken Yaş Sosyalleşmesi
İlk 16 hafta köpekler için kritik sosyalleşme dönemidir. Bu dönemde farklı insan, hayvan ve çevrelerle tanışması gelecekteki davranışlarını şekillendirir.

Köpek Parkları
Düzenli köpek parkı ziyaretleri, köpeğinizin diğer köpeklerle etkileşim kurmasını sağlar ve sosyal becerilerini geliştirir.

Pozitif Deneyimler
Sosyalleşme sürecinde her zaman pozitif deneyimler yaşanmasına özen gösterin. Olumsuz deneyimler kalıcı korkular oluşturabilir.

Sabır ve Tutarlılık
Her köpeğin sosyalleşme hızı farklıdır. Sabırlı olmak ve tutarlı bir yaklaşım sergilemek başarı için şarttır.`,
    coverImage:
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop',
    author: 'Bark&Lounge',
    publishDate: '2025-01-05',
    tags: ['sosyalleşme', 'davranış', 'eğitim'],
  },
  {
    id: '4',
    title: 'Yavru Köpek Beslenmesi: İlk 6 Ay Rehberi',
    slug: 'yavru-kopek-beslenmesi-ilk-6-ay-rehberi',
    excerpt:
      'Yavru köpeğinizin sağlıklı büyümesi için doğru beslenme stratejileri ve dikkat edilmesi gereken noktalar.',
    content: `Yavru köpek beslenmesi, köpeğinizin yaşam boyu sağlığının temelini atar. İlk 6 ayda doğru beslenme alışkanlıkları kazandırmak kritiktir.

2-8 Hafta: Anne Sütü Dönemi
Bu dönemde yavru köpekler anne sütüyle beslenir. Anne sütü tüm besin ihtiyaçlarını karşılar ve bağışıklık sistemi gelişir.

6-8 Hafta: Mama Geçişi
Yavaş yavaş yavru mamasına geçiş başlar. İlk önce suyla yumuşatılmış mama verilir.

8-12 Hafta: Düzenli Mama
Günde 3-4 öğün halinde yavru maması verilir. Porsiyon kontrolleri önemlidir.

3-6 Ay: Gelişim Dönemi
Bu dönemde hızlı büyüme vardır. Kaliteli protein ve vitamin açısından zengin mamalar tercih edilmelidir.

Beslenme İpuçları
- Her zaman temiz su bulundurulmalı
- Mama değişiklikleri kademeli yapılmalı
- İnsan yiyecekleri verilmemeli
- Düzenli kilo takibi yapılmalı`,
    coverImage:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    author: 'Bark&Lounge',
    publishDate: '2024-12-28',
    tags: ['yavru köpek', 'beslenme', 'gelişim'],
  },
  {
    id: '5',
    title: 'Köpek Eğitiminde Temel Komutlar',
    slug: 'kopek-egitiminde-temel-komutlar',
    excerpt:
      'Köpeğinize öğretebileceğiniz temel komutlar ve etkili eğitim teknikleri.',
    content: `Köpek eğitimi hem sizin hem de köpeğinizin yaşam kalitesini artıran önemli bir süreçtir. İşte temel komutlar ve eğitim teknikleri.

"Otur" Komutu
En temel komutlardan biridir. Elinizdeki ödülü köpeğin burun hizasından başının üzerine doğru hareket ettirin.

"Yat" Komutu
Köpek oturur pozisyonundayken, ödülü yavaşça yere doğru indirin. Köpek doğal olarak yatar pozisyona geçecektir.

"Kal" Komutu
Bu komut köpeğin güvenliği için kritiktir. El işareti ile birlikte kullanın ve mesafeyi kademeli artırın.

"Gel" Komutu
Köpeğin size gelmesini sağlayan komuttur. Her zaman pozitif pekiştireçlerle desteklenmelidir.

Eğitim İpuçları
- Kısa ve sık eğitim seansları yapın
- Pozitif pekiştirme kullanın
- Sabırlı ve tutarlı olun
- Ödüllendirmeyi zamanında yapın`,
    coverImage:
      'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&h=600&fit=crop',
    author: 'Bark&Lounge',
    publishDate: '2024-12-20',
    tags: ['eğitim', 'komutlar', 'davranış'],
  },
  {
    id: '6',
    title: 'Köpeklerde Stres Belirtileri ve Çözümleri',
    slug: 'kopeklerde-stres-belirtileri-ve-cozumleri',
    excerpt:
      'Köpeğinizin stres yaşadığını nasıl anlarsınız ve stresini nasıl azaltabilirsiniz?',
    content: `Köpekler de insanlar gibi stres yaşayabilir. Stres belirtilerini tanımak ve çözüm üretmek köpeğinizin refahı için önemlidir.

Stres Belirtileri
- Aşırı havlama veya uluma
- Yıkıcı davranışlar
- İştah kaybı
- Aşırı yalama
- Saklanma eğilimi
- Tremor veya nefes darlığı

Stres Nedenleri
Çevre değişiklikleri, yalnız kalma, gürültü, yeni insanlar veya hayvanlar stres kaynağı olabilir.

Çözüm Yöntemleri
1. Güvenli Alan Yaratma
Köpeğiniz için özel bir alan oluşturun. Bu alan sadece ona ait olmalı.

2. Rutinler Oluşturma
Düzenli beslenme, yürüyüş ve uyku saatleri güvenlik hissi verir.

3. Fiziksel Aktivite
Düzenli egzersiz stresin azalmasına yardımcı olur.

4. Mental Stimülasyon
Puzzle oyuncaklar ve eğitici oyunlar zihinsel yorgunluk sağlar.

5. Sakinleştirici Teknikler
Müzik, masaj veya aromaterapi gibi yöntemler kullanabilirsiniz.`,
    coverImage:
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&h=600&fit=crop',
    author: 'Bark&Lounge',
    publishDate: '2024-12-15',
    tags: ['stres', 'davranış', 'sağlık'],
  },
];
