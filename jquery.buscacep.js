/**
 * Função que pega o valor do campo de CEP e busca na API
 * doc Correios, retornando informações de UF, Cidade, Bairro & Logradouro
 *
 * Options:
 *
 * @param uf (default: '[rel="uf"]')
 * @param cidade (default: '[rel="cidade"]')
 * @param bairro (default: '[rel="bairro"]')
 * @param logradouro (default: '[rel="logradouro"]')
 *
 * Setando opções como false o resultado não será injetado no campo
 *
 * Uso Básico:
 * $('[rel="cep"]').buscacep();
 *
 * Alterando Seletor dos resultados da busca:
 * $('[rel="cep"]').buscacep({
 *     bairro: false,
 *     logradouro: '#campo_rua'
 * });
 */
(function( $ ){
    $.fn.buscacep = function(options) {
        var settings = $.extend({
            uf: '[rel="uf"]',
            cidade: '[rel="cidade"]',
            bairro: '[rel="bairro"]',
            logradouro: '[rel="logradouro"]'
        }, options );

        this.on('keyup', function () {
            var cep = parseInt($(this).val().replace('-',''));
            if (cep.toString().length >= 8) {
                console.log($(this));
                $.ajax({
                    type: 'GET',
                    url: "http://cep.correiocontrol.com.br/" + cep + ".json",
                    dataType: 'json',
                    crossDomain: true,
                    success: function (data) {
                        if(settings.uf != false){
                            $(settings.uf).val(data.uf);
                        }
                        if(settings.cidade != false) {
                            $(settings.cidade).val(data.localidade);
                        }
                        if(settings.bairro != false) {
                            $(settings.bairro).val(data.bairro);
                        }
                        if(settings.logradouro != false) {
                            $(settings.logradouro).val(data.logradouro);
                        }
                    }
                });
            }
        });
    };
})( jQuery );
