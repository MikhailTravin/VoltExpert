document.addEventListener("DOMContentLoaded", () => {
    const RATES = {
        "Квартира": 1500,
        "Дом": 1500
    };

    const SURCHARGES = {
        demolition: 0.05,
        smartShield: 0.10
    };

    const typeInputs = document.querySelectorAll(".options__input");
    const optionLabels = document.querySelectorAll(".options__label");
    const areaStartInput = document.getElementById("price-start");
    const areaEndInput = document.getElementById("price-end");
    const demolitionCheckbox = document.getElementById("c_1");
    const smartShieldCheckbox = document.getElementById("c_2");
    const totalInput = document.querySelector(".block-calc__total input");
    const rangeSlider = document.querySelector(".block-calc__range");

    const formatPrice = (value) => value.toLocaleString("ru-RU");

    const recalc = () => {
        // Тип помещения
        const selectedTypeLabel = document.querySelector(".options__input:checked + label .options__text");
        const selectedType = selectedTypeLabel ? selectedTypeLabel.textContent.trim() : "Квартира";

        // Ставка
        const rate = RATES[selectedType] || 1500;

        // Площадь
        let areaStart = parseFloat(areaStartInput.value.replace(/\D/g, "")) || 0;
        let areaEnd = parseFloat(areaEndInput.value.replace(/\D/g, "")) || 0;

        if (areaEnd < areaStart) areaEnd = areaStart;

        // Надбавки
        let multiplier = 1;
        if (demolitionCheckbox.checked) multiplier += SURCHARGES.demolition;
        if (smartShieldCheckbox.checked) multiplier += SURCHARGES.smartShield;

        // Расчет
        const totalStart = Math.round(rate * areaStart * multiplier);
        const totalEnd = Math.round(rate * areaEnd * multiplier);

        // Вывод
        totalInput.value = `${formatPrice(totalStart)} – ${formatPrice(totalEnd)} р`;
    };

    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            start: [20, 200],
            connect: true,
            range: { min: 0, max: 400 },
            format: wNumb({ decimals: 0 })
        });

        rangeSlider.noUiSlider.on('update', (values, handle) => {
            const value = parseInt(values[handle].replace(/\D/g, ""), 10) || 0;
            if (handle === 0) areaStartInput.value = value;
            else areaEndInput.value = value;
            recalc();
        });

        areaStartInput.addEventListener('input', () => {
            rangeSlider.noUiSlider.set([areaStartInput.value, null]);
        });
        areaEndInput.addEventListener('input', () => {
            rangeSlider.noUiSlider.set([null, areaEndInput.value]);
        });
    }

    typeInputs.forEach(input => input.addEventListener('change', recalc));
    optionLabels.forEach(label => label.addEventListener('click', () => setTimeout(recalc, 0))); // клик по label
    demolitionCheckbox.addEventListener('change', recalc);
    smartShieldCheckbox.addEventListener('change', recalc);

    recalc();
});