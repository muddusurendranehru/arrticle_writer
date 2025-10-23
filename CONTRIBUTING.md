# Contributing Guide

Thank you for considering contributing to the Scientific Article Writing Agent!

## 🛠️ Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/arrticle_writer.git
   cd arrticle_writer
   ```

3. **Follow the Quick Start guide** to set up your local environment

## 📝 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the project structure:
   - Database changes: Update `database/schema.sql`
   - Backend changes: Edit files in `backend/src/`
   - Frontend changes: Edit files in `frontend/src/`

3. **Test your changes**
   ```bash
   # Backend
   cd backend
   npm run build
   npm test

   # Frontend
   cd frontend
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Formatting
   - `refactor:` - Code restructuring
   - `test:` - Adding tests
   - `chore:` - Maintenance

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

## 🏗️ Project Architecture

### Development Order (IMPORTANT!)

Following the project rules, changes should be made in this order:

1. **Database First** - Update schema if needed
2. **Backend Second** - Implement and test API changes
3. **Frontend Last** - Update UI to use new features

### Code Standards

**TypeScript:**
- Use strict type checking
- Define interfaces for all data structures
- Avoid `any` type when possible

**Naming Conventions:**
- Files: `camelCase.ts` or `PascalCase.tsx`
- Functions: `camelCase`
- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

**Backend:**
- Controllers handle business logic
- Middleware for authentication and validation
- Use async/await for asynchronous operations
- Proper error handling

**Frontend:**
- Functional components with hooks
- Use Zustand for global state
- Keep components small and focused
- Use Tailwind CSS classes

## 🧪 Testing Guidelines

### Backend Testing

Test all endpoints:
```bash
cd backend
npm test
```

Manual testing with `test-api.http` file.

### Frontend Testing

Ensure no TypeScript errors:
```bash
cd frontend
npm run lint
npm run build
```

## 📚 Documentation

When adding features:

1. Update relevant README files
2. Add JSDoc comments for functions
3. Update API documentation
4. Add examples if needed

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: What happened?
2. **Expected**: What should happen?
3. **Steps**: How to reproduce?
4. **Environment**: OS, Node version, etc.
5. **Logs**: Error messages or screenshots

## 💡 Feature Requests

When suggesting features:

1. **Use case**: Why is this needed?
2. **Proposed solution**: How should it work?
3. **Alternatives**: Other approaches considered?
4. **Additional context**: Screenshots, examples, etc.

## 🔍 Code Review Process

All contributions will be reviewed for:

- **Functionality**: Does it work as expected?
- **Code quality**: Is it readable and maintainable?
- **Testing**: Are there adequate tests?
- **Documentation**: Is it well documented?
- **Security**: Are there any security concerns?

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows project structure
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] PR description explains changes
- [ ] Database → Backend → Frontend order followed

## 🎯 Priority Areas

We especially welcome contributions in:

- Additional citation formats (APA, MLA, Chicago)
- More external API integrations
- UI/UX improvements
- Performance optimizations
- Mobile responsiveness
- Accessibility features
- Internationalization
- Additional export formats

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security**: Email security concerns privately

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉

