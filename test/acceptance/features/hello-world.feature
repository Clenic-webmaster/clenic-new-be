Feature: Bank Account

  Scenario: Realiza el reporte de un servicio completado
    Given el servicio ha sido completado y aprobado por el encargado
    When solicite realizar un reporte
    Then se muestra la información faltante del reporte final a completar