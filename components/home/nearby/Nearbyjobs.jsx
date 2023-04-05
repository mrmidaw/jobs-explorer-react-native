import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { useRouter } from "expo-router";

import { COLORS } from "../../../constants";

import styles from "./nearbyjobs.style";
import { useFetch } from "../../../hooks/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Вакансии по близости</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Показать все</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading && (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        )}

        {error && <Text>Что-то пошло не так!</Text>}

        {!isLoading &&
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))}
      </View>
    </View>
  );
};

export default Nearbyjobs;
