// Tutaj skopiuj kod zadania
export async function conductInterviews(
    subjects: string[],
    interview: (subject: string) => Promise<string>,
    timeConstraint: number
  ): Promise<string[]> {
    const plannedInterviews = subjects.map(async (subject) => {
      const interviewInSchedule = restrictedPlanInterview(interview(subject).then(response => response).catch(err => err), timeConstraint);
      try{
        return await interviewInSchedule;
      }catch(err){
        return null;
      }
    });

    return (await Promise.all(plannedInterviews)).filter(Boolean).map(String);
}

function restrictedPlanInterview(promiseInterview: Promise<string>, constraint: number) {
  const timeoutInterview = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Error: Subject is not allowed"));
    }, constraint);
  });
  return Promise.race([promiseInterview, timeoutInterview]);
}