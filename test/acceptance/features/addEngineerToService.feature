Feature: Un ingeniero realiza el reporte de un servicio

  Scenario: Realizar el reporte de un servicio completado
    Given Los datos registrados son validos
    When Seleccione crear cuenta ingeniero
    Then se añade al nuevo ingeniero como el responsable de dicho servicio