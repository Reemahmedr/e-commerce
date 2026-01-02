export async function GetAllSubCategories() {
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const payload = await data.json();
  
    if (payload.message === "fail") {
      throw new Error(payload.message || "Failed to show all subcategories");
    }
  
    return payload;
  }
  