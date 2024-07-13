# BookStore

BookStore, MEVN (MongoDB, Express.js, Vue.js, Node.js) stack kullanarak geliştirilmiş bir kitap inceleme sitesidir. Bu projede kullanıcılar, kitap ekleyebilir, düzenleyebilir, puanlayabilir ve yorum yapabilir.

## Özellikler

### Kullanıcı Yönetimi
- **Kayıt Olma ve Giriş Yapma**: JWT (JSON Web Token) kullanılarak güvenli bir şekilde kullanıcı kaydı ve girişi sağlanır.
- **Yorum Yazma**: Kullanıcılar kitaplara yorum yapabilir.
- **Yorum Düzenleme ve Beğenme**: Kullanıcılar kendi yorumlarını düzenleyebilir ve diğer kullanıcıların yorumlarını beğenebilir.

### Kitap Yönetimi
- **Kitap Ekleme**: Kullanıcılar yeni kitaplar ekleyebilir.
- **Kitap Düzenleme ve Çıkarma**: Kullanıcılar ekledikleri kitapları düzenleyebilir veya silebilir.
- **Kitap Puanlama ve Puan Güncelleme**: Kullanıcılar kitaplara puan verebilir ve puanlarını güncelleyebilir.

### Ana Sayfa
- **En Son Eklenen Kitaplar**: Ana sayfada en son eklenen 4 kitap gösterilir.
- **En İyi Puanlanan Kitaplar**: En yüksek puan alan 4 kitap ana sayfada gösterilir.
- **Son Yorumlar**: Kullanıcıların son yaptığı yorumlar ana sayfada listelenir.

## Kurulum

### Gereksinimler
- Node.js

### Adımlar
1. Bu depoyu klonlayın:

   ```bash
   git clone https://github.com/nuricanbrdmr/BookStore-MEVN-Book-Review-Website.git
   cd BookStore-MEVN-Book-Review-Website
   ```

2. Sunucu ve istemci bağımlılıklarını yükleyin:

   ```bash
   cd backend
   npm install

   cd frontend
   npm install
   ```

3. Env dosya yapılandırmasını yapın:

     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRES_TIME=1d
     NODE_USER=your_nodemailer_user
     NODE_PASS=your_nodemailer_password
     ```

4. Sunucuyu çalıştırın:

   ```bash
   cd backend
   npm start
   ```

5. İstemciyi çalıştırın:

   ```bash
   cd frontend
   npm run dev
   ```

6. Web tarayıcınızda `http://localhost:5173` adresine gidin.

## Kullanım

1. Web tarayıcınızda `http://localhost:5173` adresine gidin.
2. Yeni bir kullanıcı kaydı oluşturun veya mevcut bir kullanıcı olarak giriş yapın.
3. Dashboard sayfasında kullanıcı hesabınızı düzenleyebilir. Kitap ekleme, düzenleme, silme yapabilir. Yorumlarınızı düzenleyebilir ve silebilirsiniz.
4. Kitap inceleyin, yorum yapın, puan verin ve diğer özellikleri keşfedin.

## Proje Yapısı

### Sunucu (Server)
- **Node.js**: Sunucu tarafı için kullanılan framework.
- **MongoDB ve Mongoose**: Veritabanı ve ORM için kullanılır.
- **JWT (JSON Web Token)**: Kullanıcı kimlik doğrulama için kullanılır.

### İstemci (Client)
- **Vue.js**: Kullanıcı arayüzü için kullanılan framework.
- **Vue Router**: Uygulama içinde sayfa yönlendirmeleri için kullanılır.
- **Composition API**: Uygulama durum yönetimi için kullanılır.
- **Axios**: HTTP istekleri için kullanılır.

## Ekran Görüntüsü

### Home Page
![Screenshot_1](https://github.com/user-attachments/assets/622d4fd1-eebf-4232-9687-e779a15b3165)

### Books Page
![Screenshot_2](https://github.com/user-attachments/assets/c21bcad7-7167-4fd8-9a71-ad12a65f64aa)

### Contact Page
![Screenshot_3](https://github.com/user-attachments/assets/b1e6b3ce-d5c5-4153-9112-78b3db4d2ce4)

### User Dashboar Edit Page
![Screenshot_4](https://github.com/user-attachments/assets/5cf38f0c-d82e-4951-80b7-2f0924315a74)

### User Dashborar Book Edit Page
![Screenshot_5](https://github.com/user-attachments/assets/6f2a813c-730f-4691-bfbf-59a73018632b)

## Kaynaklar

Bu projeyi geliştirirken [Arin Yazılım YouTube kanalı](https://www.youtube.com/@ArinYazilim)ndan yararlandım. Faydalı içerikleri için teşekkür ederim.
