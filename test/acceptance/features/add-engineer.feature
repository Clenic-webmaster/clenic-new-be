Feature: Asignar Ingeniero a orden
    Scenario: la orden ha sido creada recientemente y necesita un ingeniero
    Given la orden es activada
    When se asigna un ingeniero a la orden
    Then la orden cambia de estado a PENDIENTE