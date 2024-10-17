# Online Store API

این پروژه یک API برای یک فروشگاه آنلاین است که با استفاده از NestJS و MongoDB ساخته شده است. این API امکان مدیریت محصولات، سفارشات و کاربران را فراهم می‌کند.

## ساختار پروژه

پروژه از ماژول‌های زیر تشکیل شده است:

1. **AppModule**: ماژول اصلی که سایر ماژول‌ها را به هم متصل می‌کند.
2. **ProductModule**: مدیریت محصولات شامل ایجاد، به‌روزرسانی، حذف و دریافت اطلاعات محصولات.
3. **PurchaseModule**: مدیریت خریدها و سفارشات.
4. **UserModule**: مدیریت کاربران و احراز هویت.
5. **SharedModule**: شامل سرویس‌ها و کامپوننت‌های مشترک مورد استفاده در سایر ماژول‌ها.

## نحوه‌ی اجرای پروژه

1. ابتدا مطمئن شوید که Node.js و MongoDB روی سیستم شما نصب شده است.

2. پروژه را کلون کنید:

   ```
   git clone https://github.com/daniel3380rm/task-blue
   ```

3. وابستگی‌ها را نصب کنید:

   ```
   npm install
   ```

4. یک فایل `.env` در ریشه‌ی پروژه ایجاد کنید و متغیرهای محیطی زیر را در آن قرار دهید:

   ```
   MONGODB_URI=mongodb://localhost:27017/online-store
   ```

5. پروژه را اجرا کنید:

   ```
   npm run start:dev
   yarn run start:dev
   ```

6. API اکنون در آدرس `http://localhost:3000` در دسترس است.

## ویژگی‌های برجسته

1. **معماری تمیز**: پروژه با استفاده از اصول Clean Architecture پیاده‌سازی شده است که باعث جداسازی لایه‌های مختلف و افزایش قابلیت نگهداری و توسعه‌پذیری می‌شود.

2. **استفاده از CQRS**: الگوی Command Query Responsibility Segregation (CQRS) در این پروژه پیاده‌سازی شده است که امکان مقیاس‌پذیری بهتر و جداسازی عملیات خواندن و نوشتن را فراهم می‌کند.

3. **Swagger**: مستندسازی API با استفاده از Swagger انجام شده است که امکان تست و بررسی آسان API را فراهم می‌کند.

4. **Validation**: از class-validator برای اعتبارسنجی داده‌های ورودی استفاده شده است که امنیت و صحت داده‌ها را تضمین می‌کند.

5. **تست**: تست‌های واحد و یکپارچگی با استفاده از Jest نوشته شده‌اند که اطمینان از عملکرد صحیح کد را فراهم می‌کند.

6. **مدیریت خودکار کاربر پیش‌فرض**: یک سرویس برای ایجاد و مدیریت کاربر پیش‌فرض تعبیه شده است که کار با API را در مراحل اولیه‌ی توسعه آسان‌تر می‌کند.

7. **استفاده از TypeScript**: کل پروژه با TypeScript نوشته شده است که امکان توسعه‌ی مطمئن‌تر و با خطای کمتر را فراهم می‌کند.

## نکات برجسته

1. **معماری مقیاس‌پذیر**: ساختار پروژه به گونه‌ای طراحی شده است که امکان توسعه‌ی آسان و افزودن ویژگی‌های جدید را فراهم می‌کند.

2. **بهترین شیوه‌های NestJS**: از ویژگی‌های پیشرفته‌ی NestJS مانند Dependency Injection، Decorators و Pipes استفاده شده است.

3. **قابلیت تست**: ساختار پروژه به گونه‌ای است که نوشتن و اجرای تست‌ها را آسان می‌کند.

4. **مستندسازی خودکار**: با استفاده از Swagger، مستندات API به صورت خودکار تولید می‌شوند که کار با API را برای توسعه‌دهندگان front-end آسان‌تر می‌کند.

5. **انعطاف‌پذیری**: استفاده از MongoDB به عنوان دیتابیس، انعطاف‌پذیری بالایی در ذخیره‌سازی داده‌ها فراهم می‌کند.

این پروژه نشان‌دهنده‌ی توانایی در طراحی و پیاده‌سازی یک API مقیاس‌پذیر، امن و قابل نگهداری است که می‌تواند برای پروژه‌های بزرگ و پیچیده مورد استفاده قرار گیرد.
