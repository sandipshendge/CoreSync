const STORAGE_KEY = "companies";
export const getCompanies = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading companies:", error);
        return [];
    }
};

export const saveCompany = (company) => {
    const companies = getCompanies();

    const newCompany = {
        id: Date.now(),
        isActive: true,
        ...company,
    };

    const updatedCompanies = [
        ...companies,
        newCompany,
    ];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCompanies)
    );

    return newCompany;
};

export const updateCompany = (id, updatedData) => {
    const companies = getCompanies();

    const updatedCompanies = companies.map((company) =>
        company.id === id
            ? {
                ...company,
                ...updatedData,
            }
            : company
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCompanies)
    );

    return updatedCompanies;
};

export const deleteCompany = (id) => {
    const companies = getCompanies();

    const updatedCompanies = companies.filter(
        (company) => company.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCompanies)
    );

    return updatedCompanies;
};