import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  Experience,
  ExperienceJob,
} from "@/interface/entities/experience.interface";
import { Project } from "@/interface/entities/project.interface";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#000000",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginBottom: 8,
    marginTop: 10,
  },
  itemGroup: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 11,
  },
  itemSubtitle: {
    fontStyle: "italic",
    fontSize: 10,
  },
  itemDate: {
    fontSize: 10,
    textAlign: "right",
  },
  itemDescription: {
    fontSize: 10,
    marginTop: 2,
    textAlign: "justify",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: "#EEEEEE",
    padding: "2 5",
    borderRadius: 2,
  },
  bulletPoint: {
    width: 3,
    height: 3,
    backgroundColor: "black",
    borderRadius: "50%",
    marginRight: 5,
    marginTop: 5,
  },
});

interface CVDocumentProps {
  experiences: (Experience & { jobs: ExperienceJob[] })[];
  projects: Project[];
}

const formatDate = (dateString: string) => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const CVDocument = ({ experiences, projects }: CVDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>Teguh Dwi Cahya Kusuma</Text>
        <Text style={styles.title}>Software Developer</Text>
        <View style={styles.contactInfo}>
          <Text>Specialized in Backend, Frontend & Mobile Development</Text>
          {/* <Text>email@example.com</Text> */}
          {/* <Text>linkedin.com/in/profile</Text> */}
        </View>
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.itemDescription}>
          Experienced software developer with a strong background in building scalable web and mobile applications...
        </Text>
      </View> */}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experiences.map((exp) => (
          <View key={exp.id} style={styles.itemGroup}>
            {/* Company Header */}
            <Text style={styles.itemTitle}>{exp.company}</Text>
            <Text style={{ fontSize: 9, color: "#666", marginBottom: 4 }}>
              {exp.location} • {exp.total_duration}
            </Text>

            {/* Jobs within company */}
            {exp.jobs?.map((job) => (
              <View key={job.id} style={{ marginLeft: 10, marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemSubtitle}>{job.position}</Text>
                    <Text style={{ fontSize: 9, color: "#666" }}>
                      {job.employment_type}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {formatDate(job.start_date)} -{" "}
                    {job.is_current ? "Present" : formatDate(job.end_date!)}
                  </Text>
                </View>
                <Text style={styles.itemDescription}>{job.description}</Text>
              </View>
            ))}

            {/* Company-level tags */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 4,
                gap: 4,
              }}
            >
              {exp?.tags?.map((tag, idx) => (
                <Text key={idx} style={{ fontSize: 9, color: "#444" }}>
                  • {tag}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.map((project) => (
          <View key={project.id} style={styles.itemGroup}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{project.title}</Text>
              <Text style={styles.itemDate}>{project.year}</Text>
            </View>
            <Text style={styles.itemDescription}>{project.description}</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 4,
                gap: 4,
              }}
            >
              {project?.tags?.map((tag, idx) => (
                <Text
                  key={`${tag}${idx}`}
                  style={{ fontSize: 9, color: "#444" }}
                >
                  • {tag}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default CVDocument;
