
Feature: El administrador realiza el reporte final
  Como administradora de la entidad que brinda el servicio, necesito realizar el reporte del servicio de manera
  eficiente y rápida, para evitar las penalidades y pérdidas de tiempo

  Scenario: Realiza el reporte de un servicio completado
    Given el servicio ha sido completado y aprobado por el encargado
    When solicite realizar un reporte
    Then se muestra la información faltante del reporte final a completar
    And the response should be "Hello World!"

  Scenario: Realiza el reporte de un servicio que no se ha brindado
    Given el servicio aún no ha sido completado
    When solicite realizar un reporte
    Then se notifica que el servicio todavía no ha sido culminado
    And the response should be "Hello World!"
  Scenario: Realiza el reporte de un servicio que ha sido brindado, pero no aprobado
    Given el servicio aún ha sido completado mas no aprobado
    When solicite realizar un reporte
    Then se muestra la información faltante del reporte final a completar y se agenda una nueva revisión
    And the response should be "Hello World!"
