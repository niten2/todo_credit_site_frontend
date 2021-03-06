export default `
  # Техническое задание.

  1. Приложение должно поддерживать аутентификацию по паре логин и пароль.
  2. Иметь разграничение прав доступа (Администратор, Менеджер)

  - Администратор имеет право:
    создавать новых пользователей,
    редактировать только Менеджеров,
    менять пароли для всех Менеджеров,
    блокировать учетную запись Менеджера (пользователь не может войти в учетную запись),

    редактировать всех Клиентов
    изменять территориальный коэффициент Клиента
    (3 территории, каждая имеет процентный коэффициент надбавки; 0,5%, 1%, 1,5%),
    может удалить Клиента

    может редактировать займы
    может менять срок выдачи займа.

  - Менеджер может:
    создавать клиента,
    изменять данные по клиенту,
    пометить клиента на удаление.
    создавать займ

  - Администратор не может:
    создавать новых клиентов

  - Менеджер не может:
    редактировать займ
    не может менять территориальный коэффициент Клиента
    получать данные о других пользователях

  - Пользователь может:
    редактировать свои аттрибуты

  4. Создание клиента:
    ФИO (обязательное поле)
    паспортные данные (обязательное поле)
    телефон (обязательное поле)
    email (обязательное поле)
    территория - устанавливается автоматически от клиента

  5. Создание менеджера (пользователя программы), (все поля обязательны):
    ФИО
    территория
    телефон
    логин
    пароль
    email

  7. В случае неудачного входа Менеджера в больше 4 раз, запись блокируется

  8. У каждого клиента создается своя страница (карточка клиента) в ней содержатся данные:
    ФИО,
    территория,
    телефон,
    Email,
    паспортные данные,
    коэффициент надбавки,
    сумма выданных денег.

    А так же имеется 2 кнопки; «Назад» и «Выдать займ».

  9. По нажатию кнопки «Выдать займ»;
    открывается новая страничка с данными о клиенте,

    Вверху страницы
    - ФИО клиента,
    - уже выданные займы
    - дата погашения каждого из выданных займа

    Ниже по странице форма выдачи займа состоящая из 5 полей:
      - Сумма займа,
      - Коэффициент выдачи займа
        (равен территориальному коэффициенту, менеджер не может его менять,
        при создании берется коэффициент менеджера)
      - Дата выдача займа,
      - Дата окончания погашения займа
        (менеджер ее может поменять, но по умолчанию она рассчитывается сроком на 30 календарных дней),
      - Итого сумма возврата займа.

    Итого считается по следующему принципу: Сумма займа * коэффициент + 1 календарный день займа
    (равный 1% надбавки к общей суммы займа).

    Пример: 10 000      *   0,5%    +      105     = Итого к погашению
            сумма займа    коэффиц.    1 день займа

  10. В случае просрочки одного дня займа,
    а просрочка считается с того момента, когда кончился основной срок погашения 30 календарных дней,
    Итого будет высчитываться по следующему принципу;
    Сумма займа * коэффициент + 1 календарный день просрочки (равный 15% от общей суммы займа).

    Пример: 10 000 * 0,5% + 1507,5 = Итого к погашению
            сумма займа    коэффиц.       1 день займа
`
