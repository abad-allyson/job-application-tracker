export function useApplication() {
  function getByUserId({
    page = 1,
    search = "",
    limit = 20,
    userId = "",
  } = {}) {
    return $fetch("/api/job-applications", {
      method: "GET",
      query: {
        page,
        search,
        limit,
        userId,
      },
      credentials: "include",
    });
  }

  function getById(id) {
    return $fetch(`/api/job-applications/${id}`, {
      method: "GET",
      credentials: "include",
    });
  }

  function addJobApplication({ userId, application }) {
    return $fetch(`/api/job-applications/`, {
      method: "POST",
      body: { ...application, userId },
      credentials: "include",
    });
  }

  function updateStatus({ id, status }) {
    return $fetch(`/api/job-applications/${id}/status`, {
      method: "PATCH",
      body: { status },
      credentials: "include",
    });
  }

  function deleteById(id) {
    console.log(id);
    return $fetch(`/api/job-applications/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  }

  function updateById(id, { application, userId }) {
    const { _id, createdAt, updatedAt, deletedAt, ...rest } = application;
    return $fetch(`/api/job-applications/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: { ...rest, userId },
    });
  }

  return {
    getByUserId,
    getById,
    addJobApplication,
    updateStatus,
    deleteById,
    updateById,
  };
}
