class UserModel {
    constructor(user) {
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.password = user.password; // hashed before saving
        this.role = user.role || null; 
        this.roleId = user.roleId || null;
        this.designation = user.designation || null;
        this.division = user.division || null;
        this.district = user.district || null;
        this.upazila = user.upazila || null;
        this.unionName = user.unionName || null;
        this.region = user.region || null;
        this.locationDivision = user.locationDivision || null;
        this.latitude = user.latitude || null;
        this.longitude = user.longitude || null;
        this.hotspot = user.hotspot || null;
        this.whatsapp = user.whatsapp || null;
        this.status = user.status || "pending";
        this.block = user.block || null;
        this.createdAt = user.createdAt || null;
        this.updatedAt = user.updatedAt || null;
    }
}

export default UserModel;
