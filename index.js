const chemicalData = [
    {
        // id: 1,
        chemical_name: 'Ammonium Persulfate',
        vendor: 'LG Chem',
        density: 3525.92,
        viscosity: 60.63,
        packaging: 'Bag',
        pack_size: 100.00,
        unit: 'kg',
        quantity: 6495.18
    },
    {
        // id: 2,
        chemical_name: 'Caustic Potash',
        vendor: 'Formosa',
        density: 3172.15,
        viscosity: 48.22,
        packaging: 'Bag',
        pack_size: 100.00,
        unit: 'kg',
        quantity: 8751.90
    },
    {
        // id: 3,
        chemical_name: 'Dimethylaminopropylamino',
        vendor: 'LG Chem',
        density: 8435.37,
        viscosity: 12.62,
        packaging: 'Barrel',
        pack_size: 75.00,
        unit: 'L',
        quantity: 5964.61
    },
    {
        // id: 4,
        chemical_name: 'Mono Ammonium Phosphate',
        vendor: 'Sinopec',
        density: 1597.65, viscosity: 76.51,
        packaging: 'Bag',
        pack_size: 105.00,
        unit: 'kg',
        quantity: 8183.73
    },
    {
        // id: 5,
        chemical_name: 'Ferric Nitrate',
        vendor: 'DowDuPont',
        density: 364.04,
        viscosity: 14.90,
        packaging: 'Bag',
        pack_size: 105.00,
        unit: 'kg',
        quantity: 4154.33
    },
    {
        // id: 6,
        chemical_name: 'n-Pentane',
        vendor: 'Sinopec',
        density: 4535.26,
        viscosity: 66.76,
        packaging: 'N/A',
        pack_size: 'N/A',
        unit: 't',
        quantity: 6272.34
    },
    {
        // id: 7,
        chemical_name: 'Glycol Ether PM',
        vendor: 'LG Chem',
        density: 6495.18,
        viscosity: 72.12,
        packaging: 'Bag',
        pack_size: 250.00,
        unit: 'kg',
        quantity: 8749.54
    }
]

var savedChemicalData = JSON.parse(localStorage.getItem('chemicalData')) || [...chemicalData]



function loadTable(data) {
    const tableBody = document.querySelector('#chemicalTable tbody')
    tableBody.innerHTML = ''
    const dataToDisplay = data || savedChemicalData

    if (!data)
        savedChemicalData = [...chemicalData]

    dataToDisplay.forEach((row, index) => {
        const tr = document.createElement('tr')

        for (let key in row) {
            const td = document.createElement('td')
            td.innerHTML = `<span>${row[key]}</span>`
            tr.appendChild(td)
        }

        const check = document.createElement('td')
        check.innerHTML = `<input type="checkbox" />`

        const id = document.createElement('td')
        id.innerHTML = `${index + 1}`

        tr.prepend(id)
        tr.prepend(check)
        tableBody.appendChild(tr)
        if (!data)
            showToast("Data Refreshed", "success")
    })
}

function deleteRows() {
    const tableBody = document.querySelector('#chemicalTable tbody')
    const rows = Array.from(tableBody.querySelectorAll('tr'))

    const selectedRowIndices = rows
        .map((row, index) => {
            const checkbox = row.querySelector('input[type="checkbox"]')
            return checkbox && checkbox.checked ? index : null
        })
        .filter(index => index !== null)

    savedChemicalData = savedChemicalData.filter((data, index) => !selectedRowIndices.includes(index))


    loadTable(savedChemicalData)
    showToast("Rows Deleted Successfully.", "success")
    updateArrowStates()
}

function saveData() {
    localStorage.setItem('chemicalData', JSON.stringify(savedChemicalData))
    showToast("Data Saved Successfully!","success")
}

function openModal(data = null) {
    document.getElementById('addModal').style.display = 'block'

    // Check if the function is called with data (for editing)
    if (data) {
        document.getElementById('chemicalName').value = data.chemical_name
        document.getElementById('vendor').value = data.vendor
        document.getElementById('density').value = data.density
        document.getElementById('viscosity').value = data.viscosity
        document.getElementById('packaging').value = data.packaging
        document.getElementById('packSize').value = data.pack_size
        document.getElementById('unit').value = data.unit
        document.getElementById('quantity').value = data.quantity
    } else {
        document.getElementById('addChemicalForm').reset()
        const formHeader = document.getElementById('formHeader')
        const submitButton = document.getElementById('submitButton')
        submitButton.innerText = "Add Chemical"
        formHeader.innerText = "Add Chemical Data"
    }
}

function openEditModal() {
    const tableBody = document.querySelector('#chemicalTable tbody')
    const rows = Array.from(tableBody.querySelectorAll('tr'))
    const formHeader = document.getElementById('formHeader')
    const submitButton = document.getElementById('submitButton')
    submitButton.innerText = "Edit Chemical"
    formHeader.innerText = "Edit Chemical Data"
    console.log(formHeader)
    let selectedRow = null
    let rowIndex = null
    let noOfCheck = 0

    // Find the selected row
    rows.forEach((row, index) => {
        const checkbox = row.querySelector('input[type="checkbox"]')
        if (checkbox && checkbox.checked) {
            selectedRow = savedChemicalData[index]
            rowIndex = index
            noOfCheck++
        }
    })


    if (noOfCheck > 1) {
        showToast("You can select only one row to edit", "error")
        return
    }
    if (selectedRow) {
        document.getElementById('editIndex').value = rowIndex
        openModal(selectedRow)
    }
}

function closeModal() {
    document.getElementById('addModal').style.display = 'none'
    document.getElementById('addChemicalForm').reset()
}

function updateArrowStates(isUp = false) {
    const tableBody = document.querySelector('#chemicalTable tbody')
    const rows = Array.from(tableBody.querySelectorAll('tr'))
    const upArrow = document.getElementById('arrowUp')
    const downArrow = document.getElementById('arrowDown')
    const editIcon = document.getElementById('editIcon')
    const deleteIcon = document.getElementById('deleteIcon')
    let selectedRowIndex = -1


    if (!isUp) {
        rows.reverse().some((row, index) => {
            const checkbox = row.querySelector('input[type="checkbox"]')
            if (checkbox && checkbox.checked) {
                selectedRowIndex = rows.length - 1 - index
                return true
            }
            return false
        })
    } else {
        rows.some((row, index) => {
            const checkbox = row.querySelector('input[type="checkbox"]')
            if (checkbox && checkbox.checked) {
                selectedRowIndex = index
                return true
            }
            return false
        })
    }

    rows.forEach((row, index) => {
        const checkbox = row.querySelector('input[type="checkbox"]')
        checkbox && checkbox.checked ?
            row.style.backgroundColor = 'rgb(230, 230, 249)' :
            row.style.backgroundColor = 'white'

    })

    const setIconState = (icon, isActive, activeColor) => {
        icon.style.color = isActive ? activeColor : 'gray'
        icon.style.pointerEvents = isActive ? 'auto' : 'none'
    }

    if (selectedRowIndex === -1) {
        [upArrow, downArrow, editIcon, deleteIcon].forEach(icon =>
            setIconState(icon, false)
        )
        return
    }


    setIconState(editIcon, true, 'blue')
    setIconState(deleteIcon, true, 'red')
    setIconState(upArrow, selectedRowIndex > 0, 'blue')
    setIconState(downArrow, selectedRowIndex < rows.length - 1, 'blue')
}

function moveRowUp() {
    const tableBody = document.querySelector('#chemicalTable tbody')
    const rows = Array.from(tableBody.querySelectorAll('tr'))

    const checkedRows = rows.filter(row => row.querySelector('input[type="checkbox"]').checked)

    checkedRows.forEach(row => {
        const index = rows.indexOf(row)
        if (index > 0) {
            tableBody.insertBefore(row, rows[index - 1])
            rows.splice(index, 1)
            rows.splice(index - 1, 0, row)
            const temp = savedChemicalData[index]
            savedChemicalData.splice(index, 1)
            savedChemicalData.splice(index - 1, 0, temp)
        }
    })

    updateArrowStates(true)
}

function moveRowDown() {
    const tableBody = document.querySelector('#chemicalTable tbody')
    const rows = Array.from(tableBody.querySelectorAll('tr'))

    const checkedRows = rows.filter(row => row.querySelector('input[type="checkbox"]').checked)

    for (let i = checkedRows.length - 1; i >= 0; i--) {
        const row = checkedRows[i]
        const index = rows.indexOf(row)
        if (index < rows.length - 1) {
            tableBody.insertBefore(rows[index + 1], row)
            rows.splice(index, 1)
            rows.splice(index + 1, 0, row)
            const temp = savedChemicalData[index]
            savedChemicalData.splice(index, 1)
            savedChemicalData.splice(index + 1, 0, temp)
        }
    }

    updateArrowStates()
}

function sortTable(columnIndex) {
    const table = document.getElementById("chemicalTable")
    const rows = Array.from(table.querySelectorAll("tbody tr"))
    const isAscending = table.getAttribute("order") === "asc"
    const direction = isAscending ? 1 : -1

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].innerText.trim()
        const bText = b.cells[columnIndex].innerText.trim()

        return isNaN(aText) || isNaN(bText)
            ? aText.localeCompare(bText) * direction
            : (parseFloat(aText) - parseFloat(bText)) * direction
    })

    rows.forEach(row => table.querySelector("tbody").appendChild(row))

    table.setAttribute("order", isAscending ? "desc" : "asc")
}

function showToast(message, type) {
    const toast = document.getElementById('toast')
    const toastMessage = document.getElementById('toastMessage')

    toastMessage.innerText = message

    toast.classList.remove('success', 'error')

    if (type === 'success') {
        toast.classList.add('success')
    } else if (type === 'error') {
        toast.classList.add('error')
    }

    toast.classList.add('show')
    toast.classList.remove('hidden')

    setTimeout(() => {
        toast.classList.remove('show')
        toast.classList.add('hidden')
    }, 2000)
}

document.getElementById('addChemicalForm').addEventListener('submit', function (event) {
    event.preventDefault()

    const isEditing = document.getElementById('editIndex').value !== ''
    console.log(isEditing)

    const newChemical = {
        chemical_name: document.getElementById('chemicalName').value,
        vendor: document.getElementById('vendor').value,
        density: parseFloat(document.getElementById('density').value),
        viscosity: parseFloat(document.getElementById('viscosity').value),
        packaging: document.getElementById('packaging').value,
        pack_size: parseFloat(document.getElementById('packSize').value),
        unit: document.getElementById('unit').value,
        quantity: parseFloat(document.getElementById('quantity').value)
    }

    if (isEditing) {
        const editIndex = document.getElementById('editIndex').value
        savedChemicalData[editIndex] = newChemical
    } else {
        savedChemicalData.push(newChemical)
    }

    loadTable(savedChemicalData)
    closeModal()
    updateArrowStates()
    document.getElementById('addChemicalForm').reset()
})

document.querySelector('#chemicalTable').addEventListener('change', updateArrowStates)

window.onload = function () {
    loadTable(savedChemicalData)
    updateArrowStates()
}