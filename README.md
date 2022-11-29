# ToDoList-Angular-15-Java-SpringBoot-Maven-PrimeNG

Создано приложение 3-звенной архитектуры (клиент + сервер + база данных)
Каждое звено запускается на отдельном порту, клиент использует порт 4200, сервер - порт 8080, а база данных порт 5432
Клиент написан на Angular 15 с использованием библиотеки PrimeNG, шрифт я выбрал Comfortaa,
Сервер написан на Java SpringBoot, сборщик Maven, версию Java указывал 11
Базу данных я выбрал PostgreSQL, за изменениями следил с помощью программ PgAdmin 4 и Postman (вторая использовалась даже не для базы данных, а для работы с сервером, отслеживанием запросов и отправлением запросов вручную на сервер)

Программа является обычным ToDo листом. Все изменения обрабатываются сервером и сохраняются в базе данных. Можно добавлять записи, удалять, менять их местами, сортировать. У каждой записи (задания) есть свои сроки, нужно указать дату начала, дедлайн, и, если задание выполнено - дату выполнения задания.

Для того, чтобы протестировать программу, нужно:
Установить Angular (я использовал 15 версию), собрать стартовый проект (чтобы в папке проекта были все нужные библиотеки), установить в Angular PrimeNG и PrimeIcons.
С Angular я работал в программе WebStorm
Сервер разрабатывал в программе IntelliJ IDEA, нужные данные находятся в файле application.properties. (postgres : 123) - логин и пароль для доступа к базе данных. Если у вас установлена PostgreSQL и стоит другой пароль, но в этом файле нужно поменять пароль на ваш.
И еще нужно установить саму базу данных PostgreSQL.
После этого нужно создать самому базу данных с названием tasksDB. Можно это сделать в программе PgAdmin 4, либо, в консоли прописать команду CREATE DATABASE tasksDB.

Чтобы запустить программу: -запускаем сервер (я запускал в консоли в Intellij IDEA). Запускаем клиент с помощью команды ng serve -o (ключ -o создаст новую вкладку в браузере, с адресом localhost:4200). Порт сервера указан в клиенте в файле application.properties.

И все, можно тестировать и развлекаться)

Видео с демонстрацией того, как работает программа: https://www.youtube.com/watch?v=tWwbzaEaV8I

Версия без Angular и сервера, выглядит хуже намного, но можно протестировать прямо в браузере. Изменения не сохраняются нигде
https://github.com/denisolenison/SimpleToDoList-HTML-CSS-JS
