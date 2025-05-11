# YDS Projesi

Bu proje [Next.js](https://nextjs.org/) kullanılarak [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) ile oluşturulmuştur.

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:

```bash
git clone [repo-url]
cd yds_project
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyin.

## Kullanılan Teknolojiler ve Kütüphaneler

### Temel Teknolojiler

- **Next.js**: React tabanlı web framework
- **React**: Kullanıcı arayüzü için JavaScript kütüphanesi
- **TypeScript**: Tip güvenliği sağlayan JavaScript üst kümesi
- **Redux Toolkit**: Durum yönetimi için kullanılan kütüphane

### UI ve Stil

- **TailwindCSS**: Hızlı UI geliştirme için CSS framework'ü
- **Framer Motion**: Animasyonlar için kullanılan kütüphane

### Harita ve Veri

- **Maplibre-GL** ve **React-Map-GL**: Harita işlevselliği için
- **Tanstack React Table**: Veri tablolarını yönetmek için

### Form Yönetimi ve Doğrulama

- **React Hook Form**: Form yönetimi
- **Zod**: Veri doğrulama şemaları için

### API İşlemleri

- **Axios**: HTTP istekleri için

## Proje Yapısı ve Mimarisi

Proje, modüler bir yapı ile organize edilmiştir:

- `/src/components`: Yeniden kullanılabilir UI bileşenleri
- `/src/pages`: Uygulama sayfaları ve API route'ları
- `/src/store`: Redux ile durum yönetimi
- `/src/services`: API istekleri ve harici servis entegrasyonları
- `/src/hooks`: Özel React hook'ları
- `/src/contexts`: React Context API kullanılan bileşenler
- `/src/utils`: Yardımcı fonksiyonlar
- `/src/constants`: Sabit değerler
- `/src/types`: TypeScript tip tanımlamaları
- `/src/schemas`: Veri doğrulama şemaları
- `/src/models`: Veri modelleri
- `/src/styles`: Stil dosyaları
- `/src/libs`: Harici kütüphane adaptörleri

## Karşılaşılan Zorluklar ve Çözüm Yaklaşımları

### Durum Yönetimi

- **Zorluk**: Karmaşık durum yönetimi ve bileşenler arası veri paylaşımı
- **Çözüm**: Redux Toolkit ve Redux Persist kullanılarak merkezi bir durum yönetimi oluşturuldu, böylece veriler sayfalar arasında korundu.

### Harita Entegrasyonu

- **Zorluk**: Harita üzerinde dinamik veri gösterimi ve etkileşimli öğeler
- **Çözüm**: Maplibre-GL ve React-Map-GL kütüphaneleri birlikte kullanılarak performanslı bir harita deneyimi sağlandı.

### Form Yönetimi ve Doğrulama

- **Zorluk**: Karmaşık formların yönetimi ve doğrulanması
- **Çözüm**: React Hook Form ve Zod kombinasyonu kullanılarak tip güvenliği ve doğrulama işlemleri optimize edildi.

### Duyarlı Tasarım

- **Zorluk**: Farklı ekran boyutlarına uyumlu arayüz
- **Çözüm**: TailwindCSS'in duyarlı tasarım özellikleri kullanılarak tüm cihazlarda tutarlı bir deneyim sağlandı.
