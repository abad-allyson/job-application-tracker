export function useUser() {
  function getById(id) {
    return $fetch(`/api/users/id/${id}`, {
      method: "GET",
    });
  }

  function add({
    firstName = "",
    lastName = "",
    email = "",
    password = "",
  } = {}) {
    return $fetch(`/api/users/`, {
      method: "POST",
      body: { firstName, lastName, email, password },
    });
  }

  return {
    getById,
    add,
  };
}
