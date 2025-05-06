import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const UserProfile = ({ user }) => {
  const lastOnline = formatDistanceToNow(
    new Date(user.lastOnlineTimeSeconds * 1000)
  );
  const memberSince = new Date(
    user.registrationTimeSeconds * 1000
  ).getFullYear();

  const rankColor =
    {
      "candidate master": "bg-purple-100 text-purple-800",
      expert: "bg-blue-100 text-blue-800",
      "legendary grandmaster": "bg-red-100 text-red-800",
    }[user.rank] || "bg-green-100 text-green-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex h-full">
        {/* Left Column - Profile Picture */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="md:w-2/5 p-8 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 h-48 rounded-full border-4 border-white shadow-2xl mb-6"
            src={user.avatar}
            alt={`${user.firstName || user.handle}'s avatar`}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user.firstName || ""} {user.lastName || ""}
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <p className="text-gray-600">@{user.handle}</p>
              {user.rank && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${rankColor}`}>
                  {user.rank}
                </span>
              )}
            </div>

            {/* Meta Info */}
            <div className="space-y-2 text-sm text-gray-600">
              {user.organization && (
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center ">
                  <span className="mr-2">🏢</span>
                  <span>{user.organization}</span>
                </motion.div>
              )}
              <motion.div whileHover={{ x: 5 }} className="flex items-center ">
                <span className="mr-2">📅</span>
                <span>Member since {memberSince}</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center justify-center">
                <span className="mr-2">🕒</span>
                <span>Last online {lastOnline} ago</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="md:w-3/5 p-8 flex flex-col justify-between">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <StatCard
              value={user.rating || "N/A"}
              label="Current Rating"
              icon="📈"
              delay={0.1}
            />
            <StatCard
              value={user.maxRating || "N/A"}
              label="Max Rating"
              icon="🚀"
              delay={0.1}
            />
            <StatCard
              value={user.friendOfCount || 0}
              label="Friends"
              icon="👥"
              delay={0.1}
            />
            <StatCard
              value={user.contribution || 0}
              label="Contribution"
              icon="⭐"
              delay={0.1}
            />
          </div>

          {/* Progress Bar */}
          {user.rating && user.maxRating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to max rating</span>
                <span>{Math.round((user.rating / user.maxRating) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(user.rating / user.maxRating) * 100}%`,
                  }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-2.5 rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* View Profile Button */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            href={`https://codeforces.com/profile/${user.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg hover:bg-sky-700 transition-all shadow-md">
            View Full Profile on Codeforces
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated Stat Card Component
const StatCard = ({ value, label, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default UserProfile;
