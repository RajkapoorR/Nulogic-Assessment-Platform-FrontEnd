export const assessmentData = [
  {
    id: "663bb7c2113c912e86b0a65d",
    domain: "SPRING BOOT",
    level: "MEDIUM",
    questionCode: "SB-M",
    userId: "625ee0ce3c58f33f2833680c",
    score: 100,
    questionCount: 10,
    userTestCount: 1,
    totalQuestionScore: 100,
    assessmentStatus: "COMPLETED",
  },
];

export const questionList = [
  {
    questionNumber: 1,
    questionText: "What is Spring Boot?",
    options: [
      "A microservices framework",
      "A lightweight Java framework",
      "An ORM framework",
      "A JavaScript framework",
    ],
    correctOptionIndex: 1,
  },
  {
    questionNumber: 2,
    questionText:
      "What is the purpose of @SpringBootApplication annotation in Spring Boot?",
    options: [
      "To define a controller",
      "To specify a configuration class",
      "To bootstrap and configure a Spring application",
      "To define a REST endpoint",
    ],
    correctOptionIndex: 2,
  },
  {
    questionNumber: 3,
    questionText: "What is the default port for a Spring Boot application?",
    options: ["8080", "8081", "9090", "7070"],
    correctOptionIndex: 0,
  },
  {
    questionNumber: 4,
    questionText:
      "What is the primary build tool used in Spring Boot projects?",
    options: ["Maven", "Gradle", "Ant", "SBT"],
    correctOptionIndex: 0,
  },
  {
    questionNumber: 5,
    questionText:
      "Which of the following annotations is used to define a REST controller in Spring Boot?",
    options: ["@RestController", "@Controller", "@Service", "@Component"],
    correctOptionIndex: 0,
  },
  {
    questionNumber: 6,
    questionText: "What is the purpose of Spring Initializer?",
    options: [
      "To generate a new Spring Boot project with required dependencies",
      "To deploy Spring applications",
      "To run Spring Boot applications",
      "To manage Spring profiles",
    ],
    correctOptionIndex: 0,
  },
  {
    questionNumber: 7,
    questionText:
      "Which embedded container is commonly used in Spring Boot applications by default?",
    options: ["Tomcat", "Jetty", "Undertow", "All of the above"],
    correctOptionIndex: 0,
  },
  {
    questionNumber: 8,
    questionText:
      "Which annotation is used to enable Spring Data JPA repositories in Spring Boot?",
    options: [
      "@EnableJpaRepositories",
      "@EnableTransactionManagement",
      "@Repository",
      "@Entity",
    ],
    correctOptionIndex: 0,
  },
  {
    questionNumber: 9,
    questionText:
      "Which of the following is NOT a Spring Boot starter dependency?",
    options: [
      "spring-boot-starter-web",
      "spring-boot-starter-data-mongo",
      "spring-boot-starter-orm",
      "spring-boot-starter-jms",
    ],
    correctOptionIndex: 2,
  },
  {
    questionNumber: 10,
    questionText:
      "What is the purpose of @Autowired annotation in Spring Boot?",
    options: [
      "To inject dependencies",
      "To define a configuration class",
      "To specify a primary bean",
      "To enable caching",
    ],
    correctOptionIndex: 0,
  },
];

export const scoreData = [
  {
    id: "663bb7c3113c912e86b0a65e",
    domainName: "SPRING BOOT",
    level: "MEDIUM",
    questionCode: "SB-M",
    overallCount: 2,
    userAttendees: [
      "mahalakshmi.pattan@nutechnologyinc.com",
      "muthu.kumar@nutechnologyinc.com",
    ],
  },
];
