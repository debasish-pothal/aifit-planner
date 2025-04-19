"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Accordion from "@/components/accordion";

export default function MyProfile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("workout");
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);

  const userId = user?.id as string;

  const plans = useQuery(api.plans.getPlans, { userId }) || [];

  const activePlan = plans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? plans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  const getRestDays = (inputDays: string[]) => {
    const allDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return allDays.filter((day) => !inputDays.includes(day));
  };

  return (
    <div className="space-y-10 py-10 px-4">
      <div className="grid grid-cols-10 gap-6">
        {/* Left Side: User Info and Current Plans */}
        <div className="col-span-3 space-y-10">
          {/* Section 1: User Info */}
          <div className="border border-gray-300 rounded-lg p-6 text-left">
            <h1 className="text-4xl font-bold">{user?.fullName || "NA"}</h1>
            <p className="text-lg text-gray-600">
              {user?.primaryEmailAddress?.emailAddress || "Email not available"}
            </p>
          </div>

          {/* Section 2: Current Plans */}
          <div
            className="border border-gray-300 rounded-lg p-6"
            style={{ height: "calc(100vh - 278px)", overflowY: "auto" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Current Plans</h2>
              <span className="text-sm text-gray-400">
                Total: {plans.length}
              </span>
            </div>

            {plans.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-400 mb-4">
                  No plans yet. Create your first plan now!
                </p>
                <Link
                  href="/create-plan"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Create Plan
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {(showAllPlans ? plans : plans.slice(0, 8)).map((plan) => (
                  <div
                    key={plan._id}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`relative flex items-center justify-between py-2 px-4 border rounded-lg shadow-sm cursor-pointer ${
                      plan.isActive
                        ? "bg-gradient-to-r from-blue-900 to-purple-900 text-white"
                        : ""
                    }`}
                  >
                    <span className="text-lg font-medium">{plan.name}</span>
                    {plan.isActive && (
                      <span className="px-3 py-1 bg-green-200 text-green-800 text-sm rounded-full">
                        Active
                      </span>
                    )}
                    {selectedPlanId === plan._id && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {plans.length > 8 && !showAllPlans && (
              <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => setShowAllPlans(true)}
              >
                Show more
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Plan Details */}
        <div
          className="col-span-7 border border-gray-300 rounded-lg p-6 bg-[#0a0a0a]"
          style={{ height: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-4">
            <span>{currentPlan?.name}</span>
            {currentPlan?.isActive && (
              <span className="px-3 py-1 bg-green-200 text-green-800 text-sm rounded-full">
                Active
              </span>
            )}
          </h2>
          <div className="border-b mb-4 flex space-x-4">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors duration-300 flex items-center space-x-2 ${
                activeTab === "workout"
                  ? "bg-[#0a0a0a] text-gray-200 border border-gray-300 border-b-[#0a0a0a] mb-[-1px]"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("workout")}
            >
              <Image
                src="/planing-gym.svg"
                alt="Workout"
                width={20}
                height={20}
              />
              <span>Workout Plan</span>
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors duration-300 flex items-center space-x-2 ${
                activeTab === "diet"
                  ? "bg-[#0a0a0a] text-gray-200 border border-gray-300 border-b-[#0a0a0a] mb-[-1px]"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("diet")}
            >
              <Image
                src="/fried-chicken-meal.svg"
                alt="Diet"
                width={20}
                height={20}
              />
              <span>Diet Plan</span>
            </button>
          </div>
          <div>
            {activeTab === "workout" ? (
              <>
                <div className="workout-div flex items-center space-x-2">
                  <Image
                    src="/calendar.svg"
                    alt="Calendar"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>
                    Schedule:{" "}
                    {currentPlan?.workoutPlan.schedule.map((day) => (
                      <span key={day} className="font-bold text-blue-500">
                        {day}
                        {currentPlan?.workoutPlan.schedule.length - 1 !==
                          currentPlan?.workoutPlan.schedule.indexOf(day) &&
                          ", "}
                      </span>
                    ))}
                    {getRestDays(currentPlan?.workoutPlan.schedule || [])
                      .length > 0 && (
                      <span className="font-bold text-green-500">
                        {` ( Rest Days: ${getRestDays(
                          currentPlan?.workoutPlan.schedule || []
                        ).join(", ")} )`}
                      </span>
                    )}
                  </span>
                </div>

                <div className="w-full mt-4">
                  {currentPlan?.workoutPlan?.exercises.map(
                    (exercise, index) => (
                      <Accordion
                        title={exercise.day}
                        subTitle={`${exercise.routines.length} Exercises`}
                        key={index}
                      >
                        <div className="flex flex-col space-y-2">
                          {exercise.routines.map((routine, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                            >
                              <div className="w-full flex justify-between items-center">
                                <span className="text-gray-200 font-medium">
                                  {routine.name}
                                </span>
                                <div className="flex space-x-2">
                                  <span className="px-3 py-1 bg-blue-300 text-blue-700 text-sm rounded-full border border-blue-500">
                                    {routine.sets} Sets
                                  </span>
                                  <span className="px-3 py-1 bg-purple-300 text-purple-700 text-sm rounded-full border border-purple-500">
                                    {routine.reps} Reps
                                  </span>
                                </div>
                              </div>
                              {routine.description && (
                                <p className="text-gray-400 text-sm mt-2">
                                  {routine.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </Accordion>
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="workout-div flex items-center space-x-2">
                  <Image
                    src="/calories.svg"
                    alt="Calories"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  <span>
                    Daily calories intake:{" "}
                    <span className="font-bold text-blue-500">
                      {currentPlan?.dietPlan.dailyCalories}
                    </span>{" "}
                    KCAL
                  </span>
                </div>

                <div className="w-full mt-4">
                  {currentPlan?.dietPlan.meals.map((meal, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg overflow-hidden p-4 mb-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="text-blue-500 font-semibold">
                          {meal.name}
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {meal.foods.map((food, foodIndex) => (
                          <li
                            key={foodIndex}
                            className="flex items-center gap-2 text-md text-gray-400 font-medium"
                          >
                            <span className="text-xs text-blue-500">
                              {String(foodIndex + 1).padStart(2, "0")}
                            </span>
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
