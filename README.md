# YDS Projesi

Bu proje [Next.js v14](https://nextjs.org/) kullanılarak [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) ile oluşturulmuştur.

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:

```bash
git clone [repo-url]
cd yds_project
```

2. `.env` dosyasını oluşturun:
   `.env.sample` dosyasını kopyalayarak `.env` dosyası oluşturun ve gerekli ortam değişkenlerini ayarlayın.

3. Bağımlılıkları yükleyin:

```bash
npm install
```

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyin.

## Giriş Bilgileri

Uygulama şu anda mock authentication kullanmaktadır:

- **Kullanıcı adı**: admin
- **Şifre**: 12345

## Kullanılan Teknolojiler ve Kütüphaneler

### Temel Teknolojiler

- **TypeScript**
- **Redux Toolkit**: Durum yönetimi ve API önbelleğe alma

### UI ve Stil

- **TailwindCSS**: Hızlı UI geliştirme için CSS framework'ü
- **Framer Motion**: Animasyonlar için kullanılan kütüphane
- **React Icons**: İkonlar için kullanılan kütüphane

### Harita ve Veri

- **Maplibre-GL** ve **React-Map-GL**: Harita işlevselliği için
- **Tanstack React Table**: Veri tablolarını yönetmek için

### Form Yönetimi ve Doğrulama

- **React Hook Form**: Form yönetimi
- **Zod**: Veri doğrulama şemaları için

### API İşlemleri

- **Axios**: HTTP istekleri için

## Öne Çıkan Özellikler

- **Gerçek API Entegrasyonu**: Uygulama, Business YDS API'sini kullanmaktadır (OpenAPI: https://businessyds.csb.gov.tr/swagger-ui.html)
- **Redux ile API Önbelleğe Alma**: Redux RTK Query kullanılarak tekrar eden API istekleri önbelleğe alınır, bu da performansı artırır
- **Responsive Tasarım**: Tüm cihaz boyutlarında optimum kullanım deneyimi
- **Kullanıcı Dostu Arayüz**: Kullanıcının UI kullanım deyenimini arttırma
- **Gelişmiş Form Validasyonu**: Zod şemaları ile sıkı tip kontrolü

## Proje Yapısı ve Mimarisi

Proje, modüler bir yapı ile organize edilmiştir:

- `/src/components`: Yeniden kullanılabilir UI bileşenleri
- `/src/pages`: Uygulama sayfaları ve API route'ları
- `/src/store`: Redux ile durum yönetimi
- `/src/services`: API istekleri
- `/src/hooks`: Özel React hook'ları
- `/src/utils`: Yardımcı fonksiyonlar
- `/src/constants`: Sabit değerler
- `/src/types`: TypeScript tip tanımlamaları
- `/src/schemas`: Veri doğrulama şemaları
- `/src/models`: Veri modelleri
- `/src/styles`: Stil dosyaları
- `/src/libs`: Harici kütüphane adaptörleri

## Yapılacaklar (TODOs)

- **Tablo İyileştirmeleri**:
  - Datatable Filtreleme, sıralama ve arama: Server-side optimize edilecek tıpkı Pagination gibi
- **Assignment Aşama 2**: İkinci aşama geliştirmeler
- **Authorization Geliştirmesi**: Mock auth yerine gerçek auth sistemi entegrasyonu
- **Test Kapsamını Artırma**: Birim ve entegrasyon testlerinin eklenmesi

## Karşılaşılan Zorluklar ve Çözüm Yaklaşımları

### Harita Entegrasyonu

- **Zorluk**: Harita üzerinde dinamik veri gösterimi ve etkileşimli öğeler
- **Çözüm**: Maplibre-GL ve React-Map-GL kütüphaneleri birlikte kullanılarak performanslı bir harita deneyimi sağlandı.

### Duyarlı Tasarım

- **Zorluk**: Farklı ekran boyutlarına uyumlu arayüz
- **Çözüm**: TailwindCSS'in duyarlı tasarım özellikleri kullanılarak tüm cihazlarda tutarlı bir deneyim sağlandı.

### Kullanıcı Dostu Arayüz

- **Zorluk**: Arayüzün kullanıcı akışı için daha uygun hale gelmesi
- **Çözüm**: Google Maps arayüzünden esinlenerek solda sidebar çıkmartmak
