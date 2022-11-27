const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username Missing"],
    },
    userEmail: {
        type: String,
        required: [true, "Email Missing"],
        index: { unique: true, dropDups: true },
    },
    appliedJobs: {
        type: [mongoose.Types.ObjectId],
        ref: "companyModel",
    },

    password: {
        type: String,
        required: [true, "Password Missing"],
        minlength: 6,
    },

    confirmPassword: {
        type: String,
        required: [true, "Confirm Password Missing"],
        minlength: 6,
    },

    token: {
        type: String,
        required: [true, "Token Missing"],
    },

    UserType: {
        type: String,
        enum: ["I’m looking for a job switch", "I’m looking to hire talent"],
    },

    CurrentIndustry: {
        type: String,
        enum: ["IT And Software", "Sales, Non IT or Others"],
    },

    CurrentRole: {
        type: String,
        enum: [" ", "Product Design", "Product Management"],
    },
    Expertise: {
        type: [String],
    },
    workTime: {
        type: String,
        enum: ["0 - 6 Months", "6 - 12 Months", "12 - 24 Months", "< 24 Months"],
    },
    workExperience: [{
        avatar: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
        company: {
            type: String,
        },
        duration: {
            type: String,
        },
        isCompanyVerified: {
            type: Boolean,
            default: false,
        },
        tags: { type: [String] },
    }, ],

    Reason: {
        type: String,
        enum: [
            "Less Salary",
            "Commute Issues",
            "Unhealthy Culture",
            "Irrelevant Role",
        ],
    },
    TimeForSwitch: {
        type: String,
        enum: ["Under 1 Month", "More than 1 Month", "Under 3 Months"],
    },
    linkedin: {
        type: String,
        default: "",
    },
    twitter: {
        type: String,
        default: "",
    },
    dribble: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: [true, "Role Missing"],
        default: "user",
    },

    UnderGradDegree: {
        type: String,
        default: "",
    },
    PreferredLocation: {
        type: String,
        default: "",
    },
    CurrentCompany: {
        type: String,
        default: "",
    },
    JobRole: {
        type: String,
        default: "",
    },
    NoticePeriod: {
        type: String,
        default: "",
    },
    Experience: {
        type: String,
        default: "",
    },
    CTC: {
        type: String,
        default: "",
    },
    HikeRange: {
        type: String,
        default: "",
    },
    Skills: {
        type: [String],
        default: [],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    about: {
        type: String,
        default: "",
    },

    websiteLink: {
        type: String,
    },
    followers: [{
        type: [mongoose.Types.ObjectId],
        ref: "userModel",
        default: 0,
    }, ],
    following: [{
        type: [mongoose.Types.ObjectId],
        ref: "userModel",
        default: 0,
    }, ],
    verificationOTP: {
        type: Number,
        default: -1,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
});

userSchema.virtual("posts", {
    ref: "postModel",
    localField: "_id",
    foreignField: "user",
    justOne: false,
});

const User = mongoose.model("users", userSchema);

module.exports = User;