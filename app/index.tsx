import { Bell, Search, Star } from "lucide-react-native";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const doctors = [
  { 
    id: 1, 
    name: "Dr. Ali Khan", 
    specialty: "Cardiology", 
    rating: 4.9, 
    reviews: 190, 
    avatar: require("../assets/images/male-doctor-cardiology.jpg"),
    experience: "15+ years"
  },
  { 
    id: 2, 
    name: "Dr. Sarah Wilson", 
    specialty: "Dermatology", 
    rating: 4.8, 
    reviews: 156, 
    avatar: require("../assets/images/female-doctor-dermatology.jpg"),
    experience: "12+ years"
  },
  { 
    id: 3, 
    name: "Dr. James Chen", 
    specialty: "Cardiology", 
    rating: 4.7, 
    reviews: 143, 
    avatar: require("../assets/images/professional-doctor-cardiology.jpg"),
    experience: "10+ years"
  },
]

export default function HomePage() {
  return (
    <ScrollView className="bg-blue-50 min-h-screen">
      {/* Header */}
      <View className="mt-12 border-b border-gray-200 p-4 flex-row justify-between items-center">
        <View className="flex-row items-center space-x-3">
          <View className="mr-4 w-12 h-12 rounded-full bg-blue-500 items-center justify-center">
            <Text className="text-white font-bold text-lg">S</Text>
          </View>
          <View>
            <Text className="text-gray-600 text-sm">Good morning!</Text>
            <Text className="text-gray-900 font-semibold">Sajibur Rahman</Text>
          </View>
        </View>
        <Bell width={24} height={24} color="gray" />
      </View>

      {/* Search */}
      <View className="p-4">
        <View className="flex-row items-center bg-white rounded-full border border-gray-200 px-4 py-2">
          <Search width={20} height={20} color="gray" />
          <TextInput
            placeholder="Search a doctor, medicines..."
            className="ml-2 flex-1 text-gray-900"
          />
        </View>
      </View>

      {/* Popular Doctors */}
      <Text className="px-4 mt-4 text-xl font-bold text-gray-900">Popular Doctors</Text>
      <ScrollView horizontal className="px-4 mt-4" showsHorizontalScrollIndicator={false}>
        {doctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            className="bg-white rounded-2xl border border-gray-200 p-4 mr-4 w-40"
          >
            <Image source={doctor.avatar} className="w-16 h-16 rounded-full mb-2" />
            <Text className="font-bold text-gray-900">{doctor.name}</Text>
            <Text className="text-gray-600 text-sm">{doctor.specialty}</Text>
            <View className="flex-row items-center space-x-1 mt-1">
              <Star width={16} height={16} fill="gold" />
              <Text className="text-gray-900 text-sm">{doctor.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  )
}
